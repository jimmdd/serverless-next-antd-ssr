import React from 'react';
import {
    Row, Col, Result, Button,
} from 'antd';
import Router from 'next/router';

class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }

    render() {
        const { statusCode } = this.props;
        console.log('status', statusCode);
        if (statusCode === 404 || statusCode === 403 || statusCode === 500) {
            return (

                <Result
                  status={`${statusCode}`}
                  title={`${statusCode}`}
                  subTitle={statusCode === 404 ? 'Sorry, the page you visited does not exist.'
                        : statusCode === 403 ? 'Sorry, you are not authorized to access this page.'
                            : 'Sorry, the server is wrong.'}
                  extra={<Button onClick={() => Router.push('/')} type="primary">Back Home</Button>}
                />
            );
        }
        // handle IE reject
        if (statusCode === 1000) {
            return (
                <Row type="flex" justify="center" style={{ marginTop: '10vh' }}>
                    <Col sm={20} md={8}>
                        <Row>
                            <div style={{ fontSize: '145px' }}>Oops!</div>
                        </Row>
                        <Row>
                            <h1>Internet Explore is not supported, please use other browser like Chrome or Firefox.</h1>
                        </Row>
                    </Col>
                    <Col md={5}>
                        <img src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif" alt="Girl has dropped her ice cream when you use IE." />
                    </Col>
                </Row>
            );
        }


        return (
            <p>
                {this.props.statusCode
                    ? `An error ${this.props.statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
        );
    }
}

export default Error;
