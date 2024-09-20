import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ScreenModal = ({ showModal, handleClose, screenshotUrl }) => {
  // Fonction pour transformer l'URL de Google Drive en URL d'image directe
  const convertGoogleDriveUrl = (url) => {
    const fileId = url.match(/\/d\/(.*)\//)[1]; // Extraire l'ID du fichier
    return `https://drive.google.com/uc?export=view&id=${fileId}`; // Construire l'URL directe
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Voir le screenshot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {screenshotUrl ? (
          <img src={convertGoogleDriveUrl(screenshotUrl)} alt="screenshot" style={{ width: '100%' }} />
        ) : (
          <p>Aucune image disponible.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScreenModal;
