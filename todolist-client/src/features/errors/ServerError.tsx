import React from 'react';
import { useStore } from '../../app/stores/store';
import { Button, Result, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

function ServerError() {
    const { commonStore } = useStore();
    return (
        <Result
            status="500"
            title="500"
            subTitle={commonStore.error?.message}
            extra={
                <>
                    {commonStore.error?.details && (
                        <Typography.Paragraph>
                            {commonStore.error?.details}
                        </Typography.Paragraph>
                    )}
                    <Button type="primary">
                        <Link to={'/todos'}>{'Back to Todos'}</Link>
                    </Button>
                </>
            }
        />
    );
}

export default observer(ServerError);
