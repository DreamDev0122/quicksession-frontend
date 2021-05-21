import { Provider } from "../states/context";
import Layout from "../components/Layout.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Amplify } from 'aws-amplify';
import "react-alice-carousel/lib/alice-carousel.css";
// aws configuration
Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: process.env.AWS_REGION,
    userPoolId: process.env.AWS_USER_POOL_ID,
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.AWS_USER_CLIENT_ID
  },
  Storage: {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID
  }
});

// alert configuration
const alertOptions = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '20px',
  transition: transitions.SCALE
}

function MyApp(props) {
  MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  };

  const { Component, pageProps } = props;

  const Root = () => {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };
  return (
    <Provider>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Root />
      </AlertProvider>      
    </Provider>
  );
}

export default MyApp;