import React, {FC} from 'react'
import {Route as ReactRoute} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'


interface Props {
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
    path?: string | string[];
    exact?: boolean;
    title?: string;
}

const Route: FC<Props> = ({path, exact, component, title = '知乎', render}) => {
    document.title = title
    return (
        <ReactRoute path={path} exact={exact} component={component} render={render} />
    )
}

export default Route
