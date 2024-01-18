import BrandOne from '../images/brand/brand-01.svg';
import BrandTwo from '../images/brand/brand-02.svg';
import BrandThree from '../images/brand/brand-03.svg';
import BrandFour from '../images/brand/brand-04.svg';
import BrandFive from '../images/brand/brand-05.svg';

const TableOne = ({ userData, userDatacolumn }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          {userDatacolumn.map((item, index) => {
            return (
              <>
                <div className="p-2.5 xl:p-5" key={index}>
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    {item}
                  </h5>
                </div>
              </>
            )
          }
          )}
        </div>

        <div className="grid grid-cols-7 border-b border-stroke dark:border-strokedark sm:grid-cols-7  ">

          {userData.map((item, index) => {
            const userDatacolumn = ['id', 'income', 'credit score', 'loan amount', 'employment status', 'age', 'debt/income ratio']
            return (
              <>
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block">{item.id}</p>
                </div>
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block">{item.income}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{item.creditscore}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{item.loanamount}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{item.employment === true ? "Employed" : "Unemployed"}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{item.age}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-meta-5">{item.debt_to_income}</p>
                </div>
              </>
            )
          })}

        </div>
      </div>
    </div>
  );
};

export default TableOne;
