import { Component } from 'solid-js';
import { Button, Modal } from 'solid-bootstrap';
import * as store from '/src/ui/store';
import { handleWatchAdReward, hideAlerts } from '/src/ui/store';
import { BiSolidVideos } from 'solid-icons/bi';

const GetMoreCredits: Component = () => {
  return (
    <Modal centered show={store.alert.getMoreCredits} onHide={hideAlerts}>
      <Modal.Header closeButton>
        <Modal.Title>Insufficient credits</Modal.Title>
      </Modal.Header>
      <Modal.Body>Watch an ad to get more credits</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideAlerts}>
          No, thank you
        </Button>
        <Button variant="primary" onClick={handleWatchAdReward}>
          Watch <BiSolidVideos />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GetMoreCredits;
