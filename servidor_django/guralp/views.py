from django.http import JsonResponse
from .agenteInclinometroGuralp import openGcf, graficaOriginal, getFigurasUnaTraza, getFigVariasTrazasUnificadas, getSubfoldersNames
#import agenteInclinometroGuralp as agenteIncGur
from django.shortcuts import render
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

@app.route('/api/procesar_fecha/', methods=['POST'])
def procesar_fecha(request):
    data = request.json
    selected_date = data['selectedDate']
    # Procesa la fecha como desees
    print(selected_date)
    # Devuelve una respuesta si es necesario
    return {'message': 'Fecha procesada correctamente'}

def trazas(request):
    archivoGcf = "04010000.gcf"
    data = openGcf(archivoGcf)
    return JsonResponse(data)
 
#__________________________________________________________________


def trazaIndependiente(request): 
    if request.method == 'POST':
        opcionSeleccionada = request.POST.get(
            'opciones')  # Obtén el valor seleccionado
        opc = {'opcionesView': opcionSeleccionada}
        return render(request, 'index.html', opc)

    archivoGcf = "./04010000.gcf"
    datos, titulo, fecha_inicio, saltos_segundos = openGcf(archivoGcf)
    fig = graficaOriginal(datos, titulo)
    trazaHtml = fig.to_html(full_html=False)
    trz = {'traza': trazaHtml}
    
    
    # CREO QUE TOCA UTILIZAR ESTE METODO  getFigUnaTraza
    # Y UNIR VARIAS FIGURAS
    
    return render(request, 'index.html', trz)


def trazaAntes(request):
    
    # agIncGur = agenteIncGur.agenteInclinometroGuralp("guralp@magicbroccoli.de", "87065333")
    # await agIncGur.start(auto_register=True)
    
    ruta = "D:/SGC/GCF/"
    #ruta = "X:/"
    trazaHtml = ""
        
    # si accede por clic en boton o por link guralp
    if request.method == 'POST':
        
        sel = request.POST.get('opcionGrafica')
        opc = request.POST.get('tipoGrafica')  
        ntr = int(request.POST.get('ntr'))
        subfolder = request.POST.get('sltSubfolders') 
        
        fecha = request.POST.get('fecha')
        partes = fecha.split("-")  # Divide la cadena en partes usando el guion como separador
        anio = partes[0]
        mes = partes[1]
        ruta = ruta + anio + "/" + mes + "/"
        print("ruta", ruta)
        
        if sel == "individual":
            archivoGcf = "04010000.gcf"
            fig = getFigurasUnaTraza(archivoGcf)
            trazaHtml = fig.to_html(full_html=False)
        elif sel == "agrupada":
            if subfolder != None:
                ruta = ruta + subfolder + "/"
                fig = getFigVariasTrazasUnificadas(ruta, nf=ntr, sel=opc)
                trazaHtml = fig.to_html(full_html=False)
    
    else: # Carga los datos de entrada, cuando la pagina inica
        sel = "agrupada"
        ntr = 2
   
    context = {'traza': trazaHtml,
                'sel': sel,
                'ntr': ntr
              }
    
    #Comunicacion angente chat
    # agIncGur.InformBehav().run()
    
    # envío de mensaje al chat por websocket (FUNCION SINCRONA)
    # async_to_sync(channel_layer.group_send)('chat', {"type": "chat_message","message": "Dibujando Traza...","name": "GuralpAg"})
    # envío de mensaje al chat por websocket (FUNCION ASINCRONA)
    #await channel_layer.group_send('chat', {"type": "chat_message","message": "Dibujando Traza...","name": "GuralpAg"})
    
    return render(request, 'guralp.html', context)


async def chat(request):
    # agChat = agenteChat.ReceiverAgent("ovsai@magicbroccoli.de", "87065333")
    # await agChat.start(auto_register=True)

    return render(request, 'chat.html')

@csrf_exempt
def list_folders(request):
    
    ruta = "D:/SGC/GCF/"
    #ruta = "X:/"
    
    if request.method != 'POST':
        raise Http404()
    data = json.loads(request.body)
    fecha = data.get('fecha')

    partes = fecha.split("-")  # Divide la cadena en partes usando el guion como separador
    anio = partes[0]
    mes = partes[1]
    ruta = ruta + anio + "/" + mes + "/"
    
    subfolders = getSubfoldersNames(ruta)  # !!! Pensaría que esto hay que guardarlo en memoria como en RDIS para optimizar la carga de datos
    
    return JsonResponse({
        "carpetas": subfolders
    })