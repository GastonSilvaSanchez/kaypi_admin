window.addEventListener('DOMContentLoaded', (e) => {
    fetch('http://localhost:3000/listLineas')
    .then(res => res.json())
    .then(data =>{
      if(data.response === 'success'){
        const todos = data.data; 
        var num = 1;
            
        todos.forEach(todo =>{  
          document.querySelector('#listaLineasDatos').innerHTML += `
            <tr>
              <td class="text-center">${num}</td>
              <td class="text-center">${todo.Nombre}</td>
              <td class="text-center">${todo.Categoria}</td>
              <td class="text-center">
                <a href="/linea/${todo._id}"class="ui yellow icon button"><i class="edit outline icon"></i></a>
              </td>
              <td class="text-center">
                <!-- Button trigger modal -->
                <button type="button" class="ui red icon button" data-bs-toggle="modal" data-bs-target="#exampleModal${todo._id}">
                  <i class="trash alternate outline icon"></i>
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="exampleModal${todo._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h2 class="modal-title" id="exampleModalLabel">Eliminar Línea</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <br>
                        <p>¿Esta seguro que desea eliminar <b>${todo.Nombre}</b>?</p>
                        <small>* Esta acción es irrevertible</small>
                      </div>
                      <br>
                      <div class="modal-footer">
                        <button type="button" class="ui teal button" data-bs-dismiss="modal">Cancelar</button>
                        <form action="/eliminarLinea" method="post">
                          <input name="_id" value="${todo._id}" hidden> 
                          <button type="submit" class="ui red button" name="submit">Eliminar</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          `;
          num++;
        });
      } else alert(data.response);   
    })
      .catch(err => console.error(err));
    });