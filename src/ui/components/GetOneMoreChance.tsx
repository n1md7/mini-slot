import { Component } from 'solid-js';
import { Button, Modal } from 'solid-bootstrap';
import * as store from '/src/ui/store';
import { adWatchRejected, handleWatchAdOneChance } from '/src/ui/store';

const GetOneMoreChance: Component = () => {
  return (
    <Modal show={store.alert.oneMoreChance} onHide={adWatchRejected}>
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>Watch an ad to earn an additional chance and retain half of your current winnings.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={adWatchRejected}>
          No, thank you
        </Button>
        <Button variant="primary" onClick={handleWatchAdOneChance}>
          Watch
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GetOneMoreChance;
