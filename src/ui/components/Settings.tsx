import { Component } from 'solid-js';
import { Button, Modal, Form, Row, Col } from 'solid-bootstrap';
import PayTable from '/src/ui/components/PayTable';
import { isMuted, music, setIsMuted, setMusic, setSound, sound } from '/src/ui/store';

type Props = {
  show: boolean;
  hide: () => void;
};
const Settings: Component<Props> = (props) => {
  const handleMusicChange = ({ target }: Event) => {
    const { value } = target as HTMLInputElement;
    setMusic(+value);
  };

  const handleSoundChange = ({ target }: Event) => {
    const { value } = target as HTMLInputElement;
    setSound(+value);
  };

  const handleMuteChange = ({ target }: Event) => {
    const { checked } = target as HTMLInputElement;
    setIsMuted(!checked);
  };

  const enabled = () => <span class="text-success">Enabled</span>;
  const disabled = () => <span class="text-danger">Disabled</span>;

  return (
    <Modal centered show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="d-flex flex-column align-items-center gap-3">
          <PayTable />
          <Row>
            <Col>
              <Form.Label>Sound effects and music</Form.Label>
              <Form.Check
                onChange={handleMuteChange}
                checked={!isMuted()}
                type="switch"
                id="mute-switch"
                class="justify-content-center"
                label={isMuted() ? disabled() : enabled()}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Music | {music()}%</Form.Label>
              <Form.Range onChange={handleMusicChange} min={0} max={100} value={music()} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Sound | {sound()}%</Form.Label>
              <Form.Range onChange={handleSoundChange} min={0} max={100} value={sound()} />
            </Col>
          </Row>
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
