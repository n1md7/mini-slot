import { Component, createSignal } from 'solid-js';
import { Button, Modal } from 'solid-bootstrap';

const PayTable: Component = () => {
  const [show, setShow] = createSignal(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="secondary" class="align-items-center" onClick={handleOpen}>
        Pay Table
      </Button>

      <Modal show={show()} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Pay Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  <img alt="img" src="./images/Cherry.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/Cherry.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/Cherry.png" width="40" />
                </td>
                <td class="v-align">2000xBET</td>
                <td class="v-align">1000xBET</td>
                <td class="v-align">4000xBET</td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src="../../../images/Seven.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="../../../images/Seven.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="../../../images/Seven.png" width="40" />
                </td>
                <td class="v-align">150xBET</td>
                <td class="v-align">450xBET</td>
                <td class="v-align">300xBET</td>
              </tr>
              <tr>
                <td colspan="3" title="Any combinations">
                  <img alt="img" src="../../../images/Seven.png" width="40" /> x
                  <img alt="img" src="./images/Cherry.png" width="40" />
                </td>
                <td class="v-align">75xBET</td>
                <td class="v-align">75xBET</td>
                <td class="v-align">75xBET</td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src="./images/3xBAR.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/3xBAR.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/3xBAR.png" width="40" />
                </td>
                <td class="v-align">50xBET</td>
                <td class="v-align">50xBET</td>
                <td class="v-align">50xBET</td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src="./images/2xBAR.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/2xBAR.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/2xBAR.png" width="40" />
                </td>
                <td class="v-align">20xBET</td>
                <td class="v-align">20xBET</td>
                <td class="v-align">20xBET</td>
              </tr>
              <tr>
                <td>
                  <img alt="img" src="./images/1xBAR.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/1xBAR.png" width="40" />
                </td>
                <td>
                  <img alt="img" src="./images/1xBAR.png" width="40" />
                </td>
                <td class="v-align">10xBET</td>
                <td class="v-align">10xBET</td>
                <td class="v-align">10xBET</td>
              </tr>
              <tr>
                <td colspan="3" title="Any combinations">
                  <img alt="img" src="./images/1xBAR.png" width="40" />x
                  <img alt="img" src="./images/2xBAR.png" width="40" />x
                  <img alt="img" src="./images/3xBAR.png" width="40" />
                </td>
                <td>5xBET</td>
                <td>5xBET</td>
                <td>5xBET</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PayTable;
