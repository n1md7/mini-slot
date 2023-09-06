import { Component, createSignal, Show } from 'solid-js';
import GetMoreCredits from '/src/ui/components/GetMoreCredits';
import GetOneMoreChance from '/src/ui/components/GetOneMoreChance';
import Settings from '/src/ui/components/Settings';
import { Button } from 'solid-bootstrap';
import { VsGear } from 'solid-icons/vs';
import { VsUnmute } from 'solid-icons/vs';
import { VsMute } from 'solid-icons/vs';
import * as store from '/src/ui/store';

export const Menu: Component = () => {
  const [show, setShow] = createSignal(false);
  const hide = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleMute = () => store.toggleMute();

  return (
    <>
      <GetMoreCredits />
      <GetOneMoreChance />
      <Button variant="outline-secondary" onClick={handleShow}>
        <VsGear />
      </Button>
      |
      <Button variant="outline-secondary" onClick={handleMute}>
        <Show when={!store.isMuted()} fallback={<VsMute />}>
          <VsUnmute />
        </Show>
      </Button>
      <Settings show={show()} hide={hide} />
    </>
  );
};
