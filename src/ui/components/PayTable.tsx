import { Component, createSignal } from 'solid-js';
import { Button, Modal } from 'solid-bootstrap';
import BARx1 from '/images/symbols/1xBAR.png';
import BARx2 from '/images/symbols/2xBAR.png';
import BARx3 from '/images/symbols/3xBAR.png';
import Seven from '/images/symbols/Seven.png';
import Cherry from '/images/symbols/Cherry.png';

const PayTable: Component = () => {
  const [show, setShow] = createSignal(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="link" class="align-items-center" onClick={handleOpen}>
        Pay Table
      </Button>

      <Modal show={show()} onHide={handleClose} size="lg" centered scrollable fullscreen={'md-down'}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Pay Table</Modal.Title>
        </Modal.Header>
        <Modal.Body class="overflow-auto">
          <table class="table table-dark table-hover table-responsive">
            <thead>
              <tr>
                <td>Reel 1</td>
                <td>Reel 2</td>
                <td>Reel 3</td>
                <td>TOP</td>
                <td>MIDDLE</td>
                <td>BOTTOM</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img alt="img" src={Cherry} width="40" />
                </td>
                <td>
                  <img alt="img" src={Cherry} width="40" />
                </td>
                <td>
                  <img alt="img" src={Cherry} width="40" />
                </td>
                <td class="v-align">
                  <b>{2 * 256}</b>xBET
                </td>
                <td class="v-align">
                  <b>{1 * 256}</b>xBET
                </td>
                <td class="v-align">
                  <b>{3 * 256}</b>xBET
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src={Seven} width="40" />
                </td>
                <td>
                  <img alt="img" src={Seven} width="40" />
                </td>
                <td>
                  <img alt="img" src={Seven} width="40" />
                </td>
                <td class="v-align">
                  <b>{1 * 128}</b>xBET
                </td>
                <td class="v-align">
                  <b>{3 * 128}</b>xBET
                </td>
                <td class="v-align">
                  <b>{2 * 128}</b>xBET
                </td>
              </tr>
              <tr>
                <td colspan="3" title="Any combinations">
                  <img alt="img" src={Seven} width="40" /> x
                  <img alt="img" src={Cherry} width="40" />
                </td>
                <td class="v-align">
                  <b>{64}</b>xBET
                </td>
                <td class="v-align">
                  <b>{64}</b>xBET
                </td>
                <td class="v-align">
                  <b>{64}</b>xBET
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src={BARx3} width="40" />
                </td>
                <td>
                  <img alt="img" src={BARx3} width="40" />
                </td>
                <td>
                  <img alt="img" src={BARx3} width="40" />
                </td>
                <td class="v-align">
                  <b>{16}</b>xBET
                </td>
                <td class="v-align">
                  <b>{16}</b>xBET
                </td>
                <td class="v-align">
                  <b>{16}</b>xBET
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src={BARx2} width="40" />
                </td>
                <td>
                  <img alt="img" src={BARx2} width="40" />
                </td>
                <td>
                  <img alt="img" src={BARx2} width="40" />
                </td>
                <td class="v-align">
                  <b>{8}</b>xBET
                </td>
                <td class="v-align">
                  <b>{8}</b>xBET
                </td>
                <td class="v-align">
                  <b>{8}</b>xBET
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src={BARx1} width="40" />
                </td>
                <td>
                  <img alt="img" src={BARx1} width="40" />
                </td>
                <td>
                  <img alt="img" src={BARx1} width="40" />
                </td>
                <td class="v-align">
                  <b>{4}</b>xBET
                </td>
                <td class="v-align">
                  <b>{4}</b>xBET
                </td>
                <td class="v-align">
                  <b>{4}</b>xBET
                </td>
              </tr>
              <tr>
                <td colspan="3" title="Any combinations">
                  <img alt="img" src={BARx1} width="40" />x
                  <img alt="img" src={BARx2} width="40" />x
                  <img alt="img" src={BARx3} width="40" />
                </td>
                <td>
                  <b>{2}</b>xBET
                </td>
                <td>
                  <b>{2}</b>xBET
                </td>
                <td>
                  <b>{2}</b>xBET
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PayTable;
