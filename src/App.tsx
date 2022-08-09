import React from 'react';
import {CompanyTable} from "./features/companyTable/companyTable";


function App() {


    return (
      <div className={''}>
          <h1 className={'text-[40px] text-center'}>
              Тестовое Задание
          </h1>
          <h2 className={'text-[26px] text-center'}>
              Компании и их сотрудники
          </h2>
          <div className={'flex w-full flex-row'}>
              <CompanyTable />
          </div>
      </div>
  );
}
export default App;
