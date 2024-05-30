import pandas as pd
import plotly.graph_objects as go
import subprocess
import statsmodels.api as sm
from nltk.tokenize import word_tokenize
import matplotlib.pyplot as plt
from obspy import read
from datetime import datetime
import plotly.graph_objects as go
from sklearn.linear_model import LinearRegression
from decimal import Decimal, ROUND_UP
import os
from plotly.subplots import make_subplots
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import statistics

# ***************** Metodos de aquisicion de datos Guralp *****************

# Obtiene todos los archivos de una carpeta
def getFilesNames(subfolder_path):
    file_names = []
    for file in os.listdir(subfolder_path):
        if os.path.isfile(os.path.join(subfolder_path, file)):
            file_names.append(file)
    file_names.sort()
    file_names = {'file_names': file_names}
    return file_names

# Obtiene todos los nombres de las subcarpetas de una carpeta
def getSubfoldersNames(folder_path):
    subfolder_names = next(os.walk(folder_path))[1]
    if ".ipynb_checkpoints" in subfolder_names:
        subfolder_names.remove(".ipynb_checkpoints")
    subfolder_names = {'subfolder_names': subfolder_names}
    #print(subfolder_names)
    return subfolder_names

def getAnomalias(folderFecha_path):
    
    subfolder_names = next(os.walk(folderFecha_path))[1]
    if ".ipynb_checkpoints" in subfolder_names:
        subfolder_names.remove(".ipynb_checkpoints")
    
    senal0 = []
    saltos = []
    
    for subfolder in subfolder_names:
        subfolder_path = folderFecha_path + subfolder + "/"
        file_names = getFilesNames(subfolder_path)
        
        for file in file_names['file_names']:
            
             file_path = subfolder_path + file
             datosGcf = openGcf(file_path)
             #print("datosGcf['tendencia']: ", datosGcf['tendencia'])
             
             promedio_tendencia = statistics.mean(datosGcf['tendencia'])
             #print("promedio_tendencia: ", promedio_tendencia)
             if promedio_tendencia < 0.5:
                 #print("senal0 file: ", file)
                 senal0.append(file)
                 
             desviacion_estandar = statistics.stdev(datosGcf['tendencia'])
             #print("desviacion_estandar: ", desviacion_estandar)
             if desviacion_estandar > 0.3:
                 #print("saltos file: ", file)
                 saltos.append(file)
          
    datosAnomalos = {'senal0': senal0, 'saltos': saltos}
    return datosAnomalos
#________________

# Extrae los datos de la grafica con GCF2ASC.EXE
# Equivlente a ejecutar gcf2asc.exe /ruta/07251550.gcf 

# Genera los archivos planos txt, a partir de los gcf
def gcf2ascTxt(self, archivoGcf):
    p = subprocess.Popen(["gcf2asc.exe", archivoGcf])

# Abre los datos adquiridos como archivo plano
def openTxt(self, archivoTxt):
    # datos = pd.read_csv(ruta_archivo,  header=0)
    datos = pd.read_csv(archivoTxt, parse_dates=True, header=0)
    titulo = datos.columns[0] # _OVSP ACHAMB AÑO MES DIA HORA MINUTO SEGUNDO  FRECUENCIAmuestreo
    datos.columns = ['dt'] 
    return datos, titulo
#________________

# PARA LEER ARCHIVOS GCF DIRECTAMENTE DESDE PYTHON
# https://docs.obspy.org/master/packages/obspy.io.gcf.html
# Archivos GCF Güralp Compressed Format


# --sgcHoja: #C4D92E;
# 	--sgcPasto: #9FBC2E;
# 	--sgcArbol: #82A53D;
# 	--sgcGris: #8A8C8E;


def openGcf(archivoGcf):
        st = read(archivoGcf)
        
        valores = st[0].data
        valores = valores.tolist()
    
        tiempo = st[0].times()
        tiempo = tiempo.tolist()
        
        # st[0].spectrogram()
        titulo = st[0].stats.gcf.get('system_id') +' '+ st[0].stats.gcf.get('stream_id')

        # Se crea el vector de tiempo
        fi = st[0].stats.starttime
        fecha_inicio = str(fi)
        fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%dT%H:%M:%S.%fZ')
        ff = st[0].stats.endtime  # Fecha fin
        # # Obtener los tokens de fecha y hora
        # anio = fecha_inicio.year
        # mes = fecha_inicio.month
        # dia = fecha_inicio.day
        # hora = fecha_inicio.hour
        # minuto = fecha_inicio.minute
        # segundo = fecha_inicio.second
        ft = ff - fi
        saltos_segundos = Decimal(ft/len(valores))
        saltos_segundos = saltos_segundos.quantize(Decimal('0.01'), rounding=ROUND_UP)

        #--- Para descomposición
        # decompose no reconoce L(milisegundos), toca ponerlo en segundos
        idx = pd.date_range(start=fecha_inicio, periods=len(valores), freq=f'{saltos_segundos}S')  # D para diario, M para mensual,  L para milisegundos, S segundos etc.
        dats = {'t': tiempo,'dt': valores}
        datos = pd.DataFrame(dats)
        #datos.index = idx.index = idx

        idx = idx.tolist()
        
        decomposition = descomposicion(datos, fecha_inicio, saltos_segundos)
        
        decomposition.seasonal.fillna(decomposition.seasonal.mean(), inplace=True)
        estacionalidad = decomposition.seasonal
        estacionalidad = estacionalidad.tolist()
        
        decomposition.resid.fillna(decomposition.resid.mean(), inplace=True)
        ruido = decomposition.resid
        ruido = ruido.tolist()
        
        decomposition.trend.fillna(decomposition.trend.mean(), inplace=True)
        tendencia = decomposition.trend 
        tendencia = tendencia.tolist()

        datosGcf = {'tiempo': tiempo,'valores': valores, 'titulo': titulo, 'indices': idx, 'estacionalidad': estacionalidad, 'ruido': ruido, 'tendencia': tendencia}

        return datosGcf


def openGcf_inicial(archivoGcf):
    st = read(archivoGcf)
    
    valores = st[0].data
    valores = valores.tolist()
    
    tiempo = st[0].times()
    tiempo = tiempo.tolist()
    
    # st[0].spectrogram()
    
    titulo = st[0].stats.gcf.get('system_id') +' '+ st[0].stats.gcf.get('stream_id')
    
    datosGcf = {'tiempo': tiempo,'valores': valores, 'titulo': titulo}
    return datosGcf

#________________ GRAFICAS

# GRAFICA ORIGINAL
def graficaOriginal(self, datos, titulo):
    fig = go.Figure()

    # Grafica con saltos de segundo por fecha
    fig.add_trace(go.Scatter(x=datos.index, y=datos['dt'], mode='lines'))
    # Grafica con saltos de segundo acumulados
    # fig.add_trace(go.Scatter(x=datos['t'], y=datos['dt'], mode='lines'))

    fig.update_layout(
        title=titulo,
        xaxis_title='Tiempo',
        yaxis_title='Amplitud',
        xaxis=dict(showline=True, showgrid=True),
        yaxis=dict(showline=True, showgrid=True),
        template='simple_white'   # 'plotly_white' 
    )

    # fig.show()
    return fig
    
# BOX PLOT
def boxPlot(self, datos):
    # Crear la figura del diagrama de cajas y bigotes
    fig = go.Figure()

    # Agregar el diagrama de cajas y bigotes a la figura
    fig.add_trace(go.Box(y=datos['dt'], boxpoints='all', jitter=0.3, pointpos=-1.8))

    # Agregar título y etiquetas de los ejes
    fig.update_layout(title='Diagrama Box Plot', yaxis_title='Valores')

    # Mostrar el gráfico
    # fig.show()
    return fig
    
    
# Descomposición de series de tiempo
# Implica dividirla en sus componentes fundamentales, como la tendencia, la estacionalidad y los residuos

# # decompose no reconoce L(milisegundos), toca ponerlo en segundos
# periodicidadD = 'D' # D para diario, M para mensual,  L para milisegundos, S segundos etc.
# idxD = pd.date_range(start=fecha_inicio, periods=len(datos), freq=periodicidadD)

# # # Asignar el índice a la serie de tiempo
# datos.index = idxD

def descomposicion(datos, fecha_inicio, saltos_segundos):
    idx = pd.date_range(start=fecha_inicio, periods=len(datos), freq=f'{saltos_segundos}D')  # D para diario, M para mensual,  L para milisegundos, S segundos etc.
    datos.index = idx

    descomposicion = sm.tsa.seasonal_decompose(datos['dt'], model='additive')  # multiplicative

    idx = pd.date_range(start=fecha_inicio, periods=len(datos), freq=f'{saltos_segundos}S')  # D para diario, M para mensual,  L para milisegundos, S segundos etc.
    datos.index = idx
    
    return descomposicion

# Graficar la descomposición
# fig = decomposicion.plot()

# COMPONENTE ESTACIONAL

def graficaEstacional(self, datos, decomposicion):
    estacionalidad = decomposicion.seasonal
    fig = go.Figure()
    # Agregar el scatter plot a la figura
    fig.add_trace(go.Scatter(x=datos.index, y=estacionalidad, mode='lines'))

    fig.update_layout(
        title="Componente estacional",
        xaxis_title='Tiempo',
        yaxis_title='Amplitud',
        xaxis=dict(showline=True, showgrid=True),
        yaxis=dict(showline=True, showgrid=True),
        template='simple_white'   # 'plotly_white' 
    )
    # fig.show()
    return fig
    
    
# COMPONENTE RESIDUAL

def graficResidual(self, datos, decomposicion):
    ruido = decomposicion.resid
    fig = go.Figure()
    # Agregar el scatter plot a la figura
    fig.add_trace(go.Scatter(x=datos.index, y=ruido, mode='lines'))

    fig.update_layout(
        title="Componente residual",
        xaxis_title='Tiempo',
        yaxis_title='Amplitud',
        xaxis=dict(showline=True, showgrid=True),
        yaxis=dict(showline=True, showgrid=True),
        template='simple_white'   # 'plotly_white' 
    )
    # fig.show()
    return fig
    
    
# TENDENCIA

def graficaTendencia(self, datos, decomposicion):

    # tendencia = datos['dt'] - estacionalidad - ruido
    tendencia = decomposicion.trend 
    # Reemplazar los valores NaN en la componente trend con el promedio calculado
    decomposicion.trend.fillna(tendencia.mean(), inplace=True)

    fig = go.Figure()
    # Agregar el scatter plot a la figura
    fig.add_trace(go.Scatter(x=datos.index, y=tendencia, mode='lines'))

    fig.update_layout(
        title="Tendencia",
        xaxis_title='Tiempo',
        yaxis_title='Amplitud',
        xaxis=dict(showline=True, showgrid=True),
        yaxis=dict(showline=True, showgrid=True),
        template='simple_white'   # 'plotly_white' 
    )
    # fig.show()
    return fig
    
    
# Realizar una regresión lineal sobre la componente estacional

def regresionTendenciaMatPlotLib(self, decomposicion):
    tendencia = decomposicion.trend 
    X = pd.to_numeric(tendencia.index).values.reshape(-1, 1)
    modelo = LinearRegression()
    modelo.fit(X,tendencia)
    predicciones = modelo.predict(X)

    # Graficar la serie de tiempo original y la componente estacional con la regresión lineal
    plt.figure(figsize=(20, 6))
    # plt.plot(datos.index, datos['dt'], label='Serie de tiempo original')
    plt.plot(tendencia.index, tendencia, label='Componente Tendencia')
    plt.plot(tendencia.index, predicciones, color='red', label='Regresión lineal')
    plt.xlabel('Fecha')
    plt.ylabel('Valor')
    plt.title('Regresión Lineal sobre la Tendencia')
    plt.legend()
    plt.show()
    
    coeficiente_correlacion = modelo.coef_[0]
    coeficiente_correlacion
    return coeficiente_correlacion

def regresionTendencia(self, datos, decomposicion):

    # tendencia = datos['dt'] - estacionalidad - ruido
    tendencia = decomposicion.trend 
    # Reemplazar los valores NaN en la componente trend con el promedio calculado
    decomposicion.trend.fillna(tendencia.mean(), inplace=True)
    
    X = pd.to_numeric(tendencia.index).values.reshape(-1, 1)
    modelo = LinearRegression()
    modelo.fit(X,tendencia)
    predicciones = modelo.predict(X)

    fig = go.Figure()
    # Agregar el scatter plot a la figura
    fig.add_trace(go.Scatter(x=datos.index, y=tendencia, mode='lines'))
    fig.add_trace(go.Scatter(x=datos.index, y=predicciones, mode='lines', name='Línea'))

    fig.update_layout(
        title="Tendencia",
        xaxis_title='Tiempo',
        yaxis_title='Amplitud',
        xaxis=dict(showline=True, showgrid=True),
        yaxis=dict(showline=True, showgrid=True),
        template='simple_white'   # 'plotly_white' 
    )
    # fig.show()
    return fig

# Para una traza
def getFigurasUnaTraza(self, archivoGcf):
    
    ruta = "D:/"
    archivoGcf = ruta+archivoGcf
    print("archivo gcf ", archivoGcf)
    # archivoGcf = "04010000.gcf"
    datos, titulo, fecha_inicio, saltos_segundos = self.openGcf(archivoGcf)
    titulo = "Traza individual: " + titulo

    decomposition = self.descomposicion(datos, fecha_inicio, saltos_segundos)

    cr = self.regresionTendencia(datos, decomposition)
    print("Coeficiente de correlación: ", cr)
    
    fig = make_subplots(rows=5, shared_xaxes=True, subplot_titles=('Traza Original','Box-plot','Estacional','Residual','Tendencia'))
    fig.update_layout(
        height=1000, 
        width=1600,
        title=titulo,
        # xaxis_title='Tiempo',
        # yaxis_title='Amplitud',
        xaxis=dict(showline=True, showgrid=True),
        yaxis=dict(showline=True, showgrid=True),
        showlegend=False,
        template='plotly_white'  # Puedes cambiar la plantilla si lo deseas
    )
    
    fig.add_trace(go.Scatter(x=datos.index, y=datos['dt'], mode='lines'), row=1, col=1)
    
    fig.add_trace(go.Box(y=datos['dt'], boxpoints='all', jitter=0.3, pointpos=-1.8), row=2, col=1)
    
    estacionalidad = decomposition.seasonal
    fig.add_trace(go.Scatter(x=datos.index, y=estacionalidad, mode='lines'), row=3, col=1)
    
    ruido = decomposition.resid
    fig.add_trace(go.Scatter(x=datos.index, y=ruido, mode='lines'), row=4, col=1)
    
    tendencia = decomposition.trend 
    # Reemplazar los valores NaN en la componente trend con el promedio calculado
    decomposition.trend.fillna(tendencia.mean(), inplace=True)
    fig.add_trace(go.Scatter(x=datos.index, y=tendencia, mode='lines'), row=5, col=1)
    
    return fig


# nf numero de archivos o traza que se mostraran, idxFolder es el indice del folder, sel es el tipo de grafica seleccionada
def getFigVariasTrazasIndependientes(self, nf=10, idxFolder=1, sel="1"):

    ruta = "D:/SGC/Pruebas programación/Proyectos de programacion/SGCproject/sbt/data/"
    # ruta = "P:/jcalvaradop/programacion/OVSAI/OVSAIrepository/OVSAIproject/OVSAI/data/"
    
    subfolders = self.getSubfoldersNames(ruta)
    ruta = ruta + subfolders[idxFolder] + "/"  # aquí se debe indicar sobre que carpeta se realiza el análisis
    
    file_names = self.getFilesNames(ruta)
    fig = make_subplots(rows=nf, cols=1)
    fig.update_layout(height=1500, width=1600)

    # for j,fn in enumerate(file_names, 1): # así sería con todos los archivos de una subcarpeta
    for i in range(nf): # así es con un grupo de archivos determinado por el usuario
        rutaArchivo = ruta + file_names[i]
        datos, titulo, fecha_inicio, saltos_segundos = self.openGcf(rutaArchivo)
        titulo = "Trazas Independientes: " + titulo
        
        if sel=="1": # realiza los graficos de la traza original de todos los archivos de forma discriminada
            fig.add_trace(go.Scatter(x=datos.index, y=datos['dt'], showlegend=False,  mode='lines'), row=i+1, col=1)
        elif sel=="2": # realiza los graficos de la estacionalidad de todos los archivos forma discriminada
            decomposition = self.descomposicion(datos, fecha_inicio, saltos_segundos)
            estacionalidad = decomposition.seasonal
            fig.add_trace(go.Scatter(x=datos.index, y=estacionalidad, showlegend=False, mode='lines'), row=i+1, col=1)
        elif sel=="3": # realiza los graficos del ruido residual de todos los archivos de forma discriminada
            decomposition = self.descomposicion(datos, fecha_inicio, saltos_segundos)
            ruido = decomposition.resid
            fig.add_trace(go.Scatter(x=datos.index, y=ruido, showlegend=False, mode='lines'), row=i+1, col=1)
        elif sel=="4": # realiza los graficos de la tendencia de todos los archivos de forma discriminada
            decomposition = self.descomposicion(datos, fecha_inicio, saltos_segundos)
            tendencia = decomposition.trend 
            decomposition.trend.fillna(tendencia.mean(), inplace=True)
            fig.add_trace(go.Scatter(x=datos.index, y=tendencia, showlegend=False, mode='lines'), row=i+1, col=1)
            
    # Personalizar el gráfico
    
    # Mostrar el gráfico
    # fig.show()
    return fig


# nf numero de archivos o traza que se mostraran, idxFolder es el indice del folder, sel es el tipo de grafica seleccionada
def getFigVariasTrazasUnificadas(self, ruta, nf=10, sel=""):
    
    file_names = self.getFilesNames(ruta)
    
    fig = make_subplots(rows=1, cols=1)
    fig.update_layout(height=400, width=1600)

    # for j,fn in enumerate(file_names, 1): # así sería con todos los archivos de una subcarpeta
    for i in range(nf): # así es con un grupo de archivos determinado por el usuario
        rutaArchivo = ruta + file_names[i]
        datos, titulo2, fecha_inicio, saltos_segundos = self.openGcf(rutaArchivo)
        
        if sel=="Originales": # realiza los graficos de la traza original de todos los archivos de forma conjunta
            titulo = "Trazas Originales Agrupadas: "
            fig.add_trace(go.Scatter(x=datos.index, y=datos['dt'], showlegend=False, mode='lines'))
        elif sel=="Estacionales": # realiza los graficos de la estacionalidad de todos los archivos de forma conjunta
            titulo = "Trazas Estacionales Agrupadas: "
            decomposition = self.descomposicion(datos, fecha_inicio, saltos_segundos)
            estacionalidad = decomposition.seasonal
            fig.add_trace(go.Scatter(x=datos.index, y=estacionalidad, showlegend=False, mode='lines'))
        elif sel=="Residuales": # realiza los graficos del ruido residual de todos los archivos de forma conjunta
            titulo = "Trazas Residuales Agrupadas: "
            decomposition = self.descomposicion(datos, fecha_inicio, saltos_segundos)
            ruido = decomposition.resid
            fig.add_trace(go.Scatter(x=datos.index, y=ruido, showlegend=False, mode='lines'))
        elif sel=="Tendencias": # realiza los graficos de la tendencia de todos los archivos de forma conjunta
            titulo = "Tendencias Agrupadas: "
            decomposition = self.descomposicion(datos, fecha_inicio, saltos_segundos) 
            tendencia = decomposition.trend 
            decomposition.trend.fillna(tendencia.mean(), inplace=True)
            fig.add_trace(go.Scatter(x=datos.index, y=tendencia, showlegend=False, mode='lines'))
            
        titulo = titulo + titulo2
        
    # Personalizar el gráfico
    fig.update_layout(
        title=titulo,
        # xaxis_title='Tiempo',
        # yaxis_title='Amplitud',
        xaxis=dict(showline=True, showgrid=True),
        yaxis=dict(showline=True, showgrid=True),
        template='plotly_white'  # Puedes cambiar la plantilla si lo deseas
    )
    # Mostrar el gráfico
    # fig.show()
    return fig
    
    



