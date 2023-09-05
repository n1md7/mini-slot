import { Component } from 'solid-js';
import { Button, Modal } from 'solid-bootstrap';
import * as store from '/src/ui/store';
import { adWatchRejected, handleWatchAdOneChance } from '/src/ui/store';
import { BiSolidVideos } from 'solid-icons/bi';

const GetOneMoreChance: Component = () => {
  return (
    <Modal centered show={store.alert.oneMoreChance} onHide={adWatchRejected}>
      <Modal.Header closeButton>
        <Modal.Title>Need one chance?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Watch an advertisement to earn an additional chance and retain half of your current winnings.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={adWatchRejected}>
          No, thank you
        </Button>
        <Button variant="primary" onClick={handleWatchAdOneChance}>
          Watch <BiSolidVideos />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GetOneMoreChance;
