import { useState } from 'react';
import ProductOne from '../images/product/product-01.png';
import ProductTwo from '../images/product/product-02.png';
import ProductThree from '../images/product/product-03.png';
import ProductFour from '../images/product/product-04.png';
import { Link } from 'react-router-dom';


interface Props {
  data: Array<any>
}

const TableTwo = ({ data }: Props) => {

  const [ruleData, setRuleData] = useState(data)
  console.log(data)
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-2 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="flex items-center">
          <p className="font-medium"> Name</p>
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        {data.map((item, index) => (
          <Link key={item._id} to={`/rule/${item._id}`}>
            <div className="p-4 border-b-2">
              <p className="text-sm text-black dark:text-white">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;
