# ESTRA
Easy Streaming Data Analysis Tool (ESTRA) is designed with the aim of creating an easy-to-use data stream analysis platform that serves the purpose of a quick and efficient tool to explore and prototype machine learning solutions on various datasets. ESTRA is developed as a web-based, scalable, extensible, and open-source data analysis tool with a user-friendly and easy to use user interface

ESTRA consist of 4 main components:
```
    User Interface -> Javascript / ReactJs (ai_platform_ui)
    Web Server -> Python / Django (ai_platform_backend)
    Database -> PostgreSQL
    Background worker -> Python (ai_platform_core)
```

ESTRA  provides  a  flexible  deployment  structure  depending  on  the  use  case.   For personal use, ESTRA can be run on a regular personal computer.  For a large scale use, every component can be deployed into their own servers and they can even be deployed as a load-balanced multi-instance fashion.

Details shared in the following link https://open.metu.edu.tr/handle/11511/89668 

## ai_platform_ui
Developed with ReactJS, a popular user interface library. As in a typical SPA workflow, the client sends HTTP requests to a web server via FETCH API and updates the user interface partially as it receives a response from the web server. In ESTRA, the client application periodically polls the web server to fetch the latest state of the processes and if there is any change in the state or details of the executed machine learning jobs (processes), then the client-side updates the relevant areas.

## Running the code
```
REACT_APP_BACKEND_URL="http://localhost:8000" yarn start
```