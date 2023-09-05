import { Component } from 'solid-js';
import PayTable from '/src/ui/components/PayTable';
import GetMoreCredits from '/src/ui/components/GetMoreCredits';
import GetOneMoreChance from '/src/ui/components/GetOneMoreChance';

export const Menu: Component = () => {
  return (
    <>
      <GetMoreCredits />
      <GetOneMoreChance />
      <div class="d-flex justify-content-center">
        <button class="btn btn-link">Get more credits</button>
        <PayTable />
        <button class="btn btn-link">Settings</button>
      </div>
    </>
  );
};
