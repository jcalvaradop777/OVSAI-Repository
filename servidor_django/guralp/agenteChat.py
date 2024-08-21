import spade
from spade.behaviour import CyclicBehaviour

class AgenteChat(spade.agent.Agent):
    def __init__(self, agent_id, password):
        super().__init__(agent_id, password)

    def onStart(self):
        # Conéctate al servidor XMPP
        self.connect("rxworld@deshalbfrei.org", self.agent_id, self.password)

        # Agrega comportamientos al agente
        self.addBehaviour(Comportamiento())

class Comportamiento(CyclicBehaviour):
    def act(self):
        # Define la lógica del comportamiento del agente
        print("Agente activo")

        # Envía un mensaje de prueba
        self.send("rxworld@deshalbfrei.org", "Mensaje de prueba")

        # Espera mensajes entrantes
        msg = self.receive()
        if msg:
            # Procesa el mensaje recibido
            print(f"Recibido: {msg.getBody()}")

