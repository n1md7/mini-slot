import { Component } from 'solid-js';
import { Button, Modal } from 'solid-bootstrap';
import * as store from '/src/ui/store';
import { handleWatchAdReward, hideAlerts } from '/src/ui/store';

const GetMoreCredits: Component = () => {
  return (
    <Modal show={store.alert.getMoreCredits} onHide={hideAlerts}>
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>Watch an ad to get more credits</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideAlerts}>
          No, thank you
        </Button>
        <Button variant="primary" onClick={handleWatchAdReward}>
          Watch
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GetMoreCredits;
