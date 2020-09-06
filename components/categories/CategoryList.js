//TO DO 
//SHOW ERRORS
// TO ADD
// onclick event show articles related to chosen tag
//show articles count

import {
  Card,
  CardBody,
  CardHeader,
} from "shards-react";

import { useState, useEffect } from "react";
import { getCategories } from "../../actions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    error: "",
    successs: "",
    reload: "",
  });

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      setCategories(data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const listCategories = () =>
    categories &&
    categories.map((c, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{c.name}</td>
        <td>11</td>
      </tr>
    ));

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Category List</h6>
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
          <tbody>{listCategories()}</tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default CategoryList;
