import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import LoaderIndicator from '../../../app/layout/LoaderIndicator';
import Card from 'antd/lib/card';
import { Formik, Form } from 'formik';
import { Form as FormContainer } from 'semantic-ui-react';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import CheckboxInput from '../../../app/common/form/CheckboxInput';
import { Todo, TodoDTO, TodoWithParticipants } from '../../../app/models/todo';
import { history } from '../../../index';
import { v4 as uuid } from 'uuid';

function TodoForm() {
    const { todoStore, categoryStore, priorityStore } = useStore();
    const { loading, loadTodo, loadingInitial, createTodo, updateTodo } =
        todoStore;
    const { loadCategories, categoriesRegistry, categoriesTypes } =
        categoryStore;
    const { loadPriorities, prioritiesRegistry, prioritiesTypes } =
        priorityStore;
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (categoriesRegistry.size <= 1) {
            loadCategories();
        }
        if (prioritiesRegistry.size <= 1) {
            loadPriorities();
        }
    }, [
        categoriesRegistry.size,
        loadCategories,
        prioritiesRegistry.size,
        loadPriorities,
    ]);

    const [todo, setTodo] = useState<TodoWithParticipants>({
        id: '',
        title: '',
        description: '',
        comment: '',
        category: categoriesTypes[0],
        priority: prioritiesTypes[0],
        created_At: null,
        updated_At: null,
        finish_Time: null,
        done: false,
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The todo title is required'),
        category: Yup.string().required('The todo category is required'),
        priority: Yup.string().required('The todo priority is required'),
        finish_Time: Yup.string().required('Date is required').nullable(),
        done: Yup.boolean().default(false),
    });

    useEffect(() => {
        if (id) {
            loadTodo(id).then((todo) => {
                const formTodo = {
                    ...todo!,
                    category: categoriesRegistry.get(todo!.category.id),
                    priority: prioritiesRegistry.get(todo!.priority.id),
                };
                setTodo(formTodo!);
            });
        }
    }, [id, loadTodo]);

    function handleForSubmit(todo: TodoWithParticipants) {
        let newTodo = {
            ...new TodoDTO(todo),
            category: categoriesRegistry.get(todo.category),
            priority: prioritiesRegistry.get(todo.priority),
        };
        if (todo.id.length === 0) {
            newTodo = {
                ...newTodo,
                id: uuid(),
            };
            createTodo(newTodo);
        } else {
            updateTodo(newTodo);
        }
    }
    if (loadingInitial) return <LoaderIndicator content={'Loading todo...'} />;
    return (
        <Card style={{ minWidth: '420px' }}>
            <Formik
                initialValues={todo}
                onSubmit={(values) => handleForSubmit(values)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete={'off'}>
                        <FormContainer>
                            <TextInput placeholder={'Title'} name={'title'} />

                            <TextAreaInput
                                rows={3}
                                placeholder={'Description'}
                                name={'description'}
                            />

                            <SelectInput
                                options={categoriesTypes}
                                placeholder={'Category'}
                                name={'category'}
                            />
                            <SelectInput
                                options={prioritiesTypes}
                                placeholder={'Priority'}
                                name={'priority'}
                            />

                            <DateInput
                                placeholderText={'Finish Time'}
                                name={'finish_Time'}
                                showTimeSelect
                                timeCaption={'time'}
                                dateFormat={'MMMM d, yyyy h:mm aa'}
                            />
                            <CheckboxInput label={'Done'} name={'done'} />

                            <TextAreaInput
                                rows={2}
                                placeholder={'Comment'}
                                name={'comment'}
                            />

                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                htmlType={'submit'}
                                loading={loading}
                                type={'primary'}
                            >
                                {'Submit'}
                            </Button>
                            <Link to={'/todos'}>
                                <Button htmlType={'button'}>{'Cancel'}</Button>
                            </Link>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </Card>
    );
}

export default observer(TodoForm);
