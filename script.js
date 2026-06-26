*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Vazirmatn',sans-serif;
}

body{
    background:#081C3A;
    color:#D4AF37;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:30px;
}

.container{
    width:100%;
    max-width:700px;
    text-align:center;
}

.logo{
    width:120px;
    margin-bottom:15px;
}

h1{
    font-size:28px;
    margin-bottom:8px;
    font-weight:700;
}

h2{
    font-size:18px;
    margin-bottom:35px;
    font-weight:400;
}

.search-box{
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,.15);
    border-radius:18px;
    padding:30px;
    box-shadow:0 10px 30px rgba(0,0,0,.4);
}

.form-group{
    margin-bottom:20px;
    text-align:right;
}

label{
    display:block;
    margin-bottom:8px;
    font-size:16px;
    color:#F4D87D;
}

input,
select{
    width:100%;
    padding:14px;
    border:none;
    border-radius:12px;
    font-size:16px;
    outline:none;
    background:#ffffff;
    color:#222;
    transition:.3s;
}

input:focus,
select:focus{
    box-shadow:0 0 12px #D4AF37;
}

button{
    width:100%;
    padding:15px;
    border:none;
    border-radius:12px;
    background:#D4AF37;
    color:#081C3A;
    font-size:18px;
    font-weight:bold;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#F2CB4D;
    transform:translateY(-2px);
}

button:active{
    transform:scale(.98);
}

#result{
    margin-top:30px;
}

.result-card{
    border-radius:18px;
    padding:25px;
    color:white;
    text-align:right;
    box-shadow:0 10px 25px rgba(0,0,0,.35);
    animation:fadeIn .5s ease;
}

.result-card h3{
    text-align:center;
    font-size:28px;
    margin-bottom:20px;
}

.result-card p{
    margin:12px 0;
    line-height:1.9;
    font-size:17px;
}

.boys{
    background:linear-gradient(135deg,#1976D2,#0D47A1);
}

.girls{
    background:linear-gradient(135deg,#EC407A,#C2185B);
}

.not-found{
    background:#B71C1C;
    color:white;
    border-radius:15px;
    padding:20px;
    text-align:center;
    font-size:18px;
    animation:fadeIn .5s;
}

@keyframes fadeIn{

    from{
        opacity:0;
        transform:translateY(20px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}

@media(max-width:768px){

    body{
        padding:15px;
    }

    .search-box{
        padding:20px;
    }

    h1{
        font-size:22px;
    }

    h2{
        font-size:15px;
    }

    .logo{
        width:90px;
    }

    input,
    select,
    button{
        font-size:15px;
    }

    .result-card h3{
        font-size:22px;
    }

}

@media(max-width:480px){

    h1{
        font-size:19px;
    }

    h2{
        font-size:14px;
    }

    .search-box{
        padding:15px;
    }

    label{
        font-size:15px;
    }

}
