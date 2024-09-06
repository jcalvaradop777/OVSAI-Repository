import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";

export default function ModalBasic({ setMostrar, mostrar, contenido }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen(mostrar);
    setMostrar(mostrar);
  }, [isOpen]);

  return (
    <Modal
      backdrop={"blur"}
      isOpen={isOpen}
      onClose={() => {
        setMostrar(false);
        onClose();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-[#82A53D]">
              Modal Title
            </ModalHeader>
            <ModalBody>
              {contenido}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setMostrar(false);
                  onClose();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
