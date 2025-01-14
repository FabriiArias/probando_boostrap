function loguear(event){
   // alert('on click')
    event.preventDefault();
    let mat = document.getElementById('matricula').value;
    let pass = document.getElementById('pass').value;
    // console.log(`Matricula: ${mat}, Contraseña: ${pass}`);

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            matricula: mat,
            password: pass
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login exitoso");
            // redirigir a pag2
            window.location.href = '/pag2';
            limpiarCampos();
        } else {
            alert("Credenciales inválidas");
        }
    })
    .catch(error => console.error('Error:', error));
    
}

function limpiarCampos(){
    document.getElementById('matricula').value = '';
    document.getElementById('pass').value = '';
}