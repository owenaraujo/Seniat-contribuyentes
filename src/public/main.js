const alerta = document.querySelector("#alerta");
const options = document.querySelector("#options");
const btnRegistrar = document.querySelector("#btnRegistrar");
const formRecuperar = `<div class="card">
<div class="card-header">
        <h1 class="h4 text-center">Ingrese nombre de usuario</h1>
</div>
<div class="list-scroll-main">
<div class="card-body">

        <div class="form-group">

      
        
        
            <div class=" md-form">
            
                <i class="fas fa-check prefix"></i>
                <input autocomplete="off" type="text"
                    name="" id="userSearch"
                    value=""
                    class="form-control validate">
                <label data-error="wrong" data-success="right"
                    for="userSearch">ingrese se respuesta</label>
            </div>
            </div>
            </div>

              <div class="text-center">
<button onclick="searchUser()"  class="btn btn-primary">Buscar</button>

</div>
    </div>
</div>
</div>`;
const form_signup = `<div class="card">
 <div class="card-header">
         <h1 class="h4 text-center"> Registrar</h1>
 </div>
 <div class="list-scroll-main">
 <div class="card-body">
     
    
         <form class="form-group">
             
             <div class=" md-form">
                 <i class="fas fa-user prefix"></i>
                 <input autocomplete="off" type="text"
                     name="" id="username_signup"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="username_ss">Ingrese nombre de usuario</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-lock prefix"></i>
                 <input autocomplete="off" type="password"
                     name="" id="password_signup"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="password_signup">Ingrese contraseña</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-check prefix"></i>
                 <input autocomplete="off" type="password"
                     name="" id="password_check"
                     class="form-control no-validate">
                 <label data-error="wrong" data-success="right"
                     for="password_check">verifique contraseña</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-question prefix"></i>
                 <input autocomplete="off" type="text"
                     name="" id="pregunta"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="password_check">Ingrese pregunta de seguridad</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-check prefix"></i>
                 <input autocomplete="off" type="text"
                     name="" id="respuesta"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="password_check">Registre su respuesta</label>
             </div>
             </form>
             </div>
         
              
               <div class="text-center">
<button onclick="addUser()"  class="btn btn-primary">registrar</button>

</div> 
     </div>
 </div>
</div>`;
const btnMain = `<div class="text-center">
<button onclick="registrar()" class="btn btn-lg btn-primary ">registrar </button>
<button class="btn btn-success ">¿olvidó su contraseña? </button>
</div>`;
const contraseñaInvalide = ` <div
class="alert alert-danger alert-dismissible fade show "
role="alert"
id=""
>
<strong>Error!</strong> Verificacion de Contraseña incorrecta
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const successRegitro = ` <div
class="alert alert-success alert-dismissible fade show "
role="alert"
id=""
>
<strong>Exito!</strong> Usuario guardado con exito
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const succesRecuperar = ` <div
class="alert alert-success alert-dismissible fade show "
role="alert"
id=""
>
<strong>Exito!</strong> Contraseña recuperada con exito
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const errorRegistro = ` <div
class="alert alert-danger alert-dismissible fade show "
role="alert"
id=""
>
<strong>Error!</strong> el nombre de usuario se encuentra ocupado
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const registrar = () => {
  options.innerHTML = form_signup;
};
const addUser = async () => {
  const { data } = await axios.get(`/req/usuarios/${username_signup.value}`);
  const [Usuario] = data;
  if (username_signup.value !== Usuario.username) {
    addUserPost(
      password_signup.value,
      username_signup.value,
      pregunta.value,
      respuesta.value
    );
  } else {
    alerta.innerHTML += contraseñaInvalide;
  }
};
const addUserPost = async (data) => {
  try {
    await axios.post(
      "/signup/",
      (data = {
        username: username_signup.value,
        password: password_signup.value,
        pregunta_seguridad: pregunta.value,
        respuesta: respuesta.value,
      })
    );
    options.innerHTML = btnMain;
    alerta.innerHTML += successRegitro;
  } catch (err) {
    console.log(err);
  }
};
const Recuperar = () => {
  options.innerHTML = formRecuperar;
};

const searchUser = async () => {
  const usuario = document.querySelector("#userSearch").value;
  const { data } = await axios.get(`/req/usuarios/${usuario}`);
  PreguntaContraseña(data);
};
const PreguntaContraseña = (data) => {
  const [datos] = data;
  options.innerHTML = `<div class="card">
<div class="card-header">
        <h1 class="h4 text-center"> hola ${datos.username}</h1>
</div>
<div class="list-scroll-main">
<div class="card-body">

        <div class="form-group">

        <h1 class="h5 text-center">¿${datos.pregunta_seguridad}?</h1>
        <input hidden id="idCheck" value="${datos.id}">
        
            <div class=" md-form">
            
                <i class="fas fa-check prefix"></i>
                <input autocomplete="off" type="text"
                    name="" id="respuestaCheck"
                    value=""
                    class="form-control validate">
                <label data-error="wrong" data-success="right"
                    for="respuestaCheck">ingrese se respuesta</label>
            </div>
            </div>
            </div>

              <div class="text-center">
<button onclick="sendRespuesta()"  class="btn btn-primary">verificar</button>

</div>
    </div>
</div>
</div>`;
};
const sendRespuesta = async () => {
  const id = document.querySelector("#idCheck").value;
  const { data } = await axios.get(`/req/usuarios/respuesta/${id}`);
  const [datos] = data;
  const respuesta = document.querySelector("#respuestaCheck").value;
  console.log(id);

  if (respuesta === datos.respuesta) {
    RecuperarPass(idCheck.value);
  } else {
    console.log("no verificable");
  }
};
const RecuperarPass = (id) => {
  options.innerHTML = `<div class="card">
  <div class="card-header">
          <h1 class="h4 text-center"> Ingresa contraseña nueva</h1>
  </div>
  <div class="list-scroll-main">
  <div class="card-body">
  
          <div class="form-group">
  
          
          <input hidden id="idPass" value="${id}">
          
              <div class=" md-form">
              
                  <i class="fas fa-check prefix"></i>
                  <input autocomplete="off" type="text"
                      name="" id="pass"
                      value=""
                      class="form-control validate">
                  <label data-error="wrong" data-success="right"
                      for="pass">ingrese se respuesta</label>
              </div>
              <div class=" md-form">
              
                  <i class="fas fa-check prefix"></i>
                  <input autocomplete="off" type="text"
                      name="" id="passCheck"
                      value=""
                      class="form-control validate">
                  <label data-error="wrong" data-success="right"
                      for="passCheck">ingrese se respuesta</label>
              </div>
              </div>
              </div>
  
                <div class="text-center">
  <button onclick="sendPassNew()"  class="btn btn-primary">Guardar</button>
  
  </div>
      </div>
  </div>
  </div>`;
};
const sendPassNew = async () => {
  const pass = document.querySelector("#pass").value;
  const passCheck = document.querySelector("#passCheck").value;
  const idPass = document.querySelector("#idPass").value;
  if (pass === passCheck) {
    await axios.post(
      "/recuperarPass/",
      (data = {
        password: pass,
        id: idPass,
      })
    );
    alerta.innerHTML += succesRecuperar;
    options.innerHTML = btnMain;
  } else {
    alerta.innerHTML = contraseñaInvalide;
  }
};
