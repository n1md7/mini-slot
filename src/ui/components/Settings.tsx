import { Component } from 'solid-js';
import { Button, Modal } from 'solid-bootstrap';
import PayTable from '/src/ui/components/PayTable';

type Props = {
  show: boolean;
  hide: () => void;
};
const Settings: Component<Props> = (props) => {
  return (
    <Modal centered show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="d-flex flex-column align-items-center">
          <PayTable />
          <div>
            <label for="sound">Sound</label>
            <input type="checkbox" id="sound" />
          </div>
          <div>
            <label for="music">Music</label>
            <input type="checkbox" id="music" />
          </div>
          TODO: Add more settings
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
