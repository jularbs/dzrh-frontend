import { Card, CardBody, CardHeader } from "shards-react";

import { getTags } from "../../actions/tag";
import { useEffect, useState } from "react";

// TO ADD
// onclick event show articles related to chosen tag
//show articles count

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    error: "",
    message: "",
    reload: "",
  });

  const init = () => {
    getTags().then((data) => {
      if (data.error) setValues({ ...values, error: data.error });

      setTags(data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const listTags = () =>
    tags &&
    tags.map((t, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{t.name}</td>
        <td>11</td>
      </tr>
    ));

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
          <tbody>{listTags()}</tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default TagList;
