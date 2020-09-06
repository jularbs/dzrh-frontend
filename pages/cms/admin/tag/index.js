import { Container, Row, Col,Card,CardBody,CardHeader } from "shards-react";
import Layout from "../../../../layouts/Layout";
import PageTitle from "../../../../components/common/PageTitle";
import Admin from "../../../../components/auth/Admin.component";

import TagForm from "../../../../components/tags/TagForm";
import TagList from "../../../../components/tags/TagList";

//tools
import {loremIpsum} from "lorem-ipsum";
import moment from "moment";

const AdminTagManagement = () => {
  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Tags Management"
            subtitle="Articles"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="4" md="6" sm="12">
            <TagForm />
            <TagList />
          </Col>
          <Col lg="8" md="6" sm="12">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Article List</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Title
                      </th>
                      <th scope="col" className="border-0">
                        Author
                      </th>
                      <th scope="col" className="border-0">
                        Publish Date
                      </th>
                      <th scope="col" className="border-0">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Draft</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date()).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{loremIpsum()}</td>
                      <td>{loremIpsum({ count: 2, units: "words" })}</td>
                      <td>{moment(new Date).fromNow()}</td>
                      <td>Published</td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default AdminTagManagement;
