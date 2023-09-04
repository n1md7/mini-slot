import { Component } from 'solid-js';
import PayTable from '/src/ui/components/PayTable';

export const Menu: Component = () => {
  return (
    <>
      <div class="d-flex justify-content-center">
        <button class="btn btn-link">Get more credits</button>
        <PayTable />
        <button class="btn btn-link">Settings</button>
      </div>
    </>
  );
};
