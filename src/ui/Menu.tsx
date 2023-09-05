import { Component, createSignal } from 'solid-js';
import GetMoreCredits from '/src/ui/components/GetMoreCredits';
import GetOneMoreChance from '/src/ui/components/GetOneMoreChance';
import Settings from '/src/ui/components/Settings';
import { Button } from 'solid-bootstrap';
import { VsGear } from 'solid-icons/vs';

export const Menu: Component = () => {
  const [show, setShow] = createSignal(false);
  const hide = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <GetMoreCredits />
      <GetOneMoreChance />
      <Button variant="secondary" onClick={handleShow}>
        <VsGear />
      </Button>
      <Settings show={show()} hide={hide} />
    </>
  );
};
