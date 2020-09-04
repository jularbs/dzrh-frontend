import {
  Card,
  CardBody,
  Form,
  FormInput,
  CardHeader,
  Button,
} from "shards-react";

const TagList = () => {
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Tag List</h6>
      </CardHeader>
      <CardBody className="p-0 pb-3">
        <table className="table mb-0">
          <thead className="bg-light">
            <tr>
              <th scope="col" className="border-0">
                #
              </th>
              <th scope="col" className="border-0">
                Category Name
              </th>
              <th scope="col" className="border-0">
                Articles
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Covid 19</td>
              <td>11</td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default TagList;
