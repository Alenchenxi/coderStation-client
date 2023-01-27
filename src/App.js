import './App.css';
import { Layout } from 'antd'
import NavHeader from './components/NavHeader'
import FooterBar from './components/FooterBar'

const { Header, Content, Footer } = Layout

function App() {
  return (
    <Layout>
      <Header>
        <NavHeader />
      </Header>
      <Content>

      </Content>
      <Footer>
        <FooterBar />
      </Footer>
    </Layout>
  );
}

export default App;
