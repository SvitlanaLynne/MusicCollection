                            //RENDER THE TABLE (GET)           
    refreshTable();

    function refreshTable ()
    {
        fetch('http://localhost:5555/artistalbum')
        .then(res=>res.json())
        .then(albumTable=>{
            
            console.dir(albumTable);
            
        const albumTableContainer = document.querySelector('.musicTableContainer');
       
        
        
        for (let elem of albumTable)
        {
            
            albumTableContainer.innerHTML +=
            `
            
            <tr>
            <td class = 'artistIdNumber'>${elem['ArtistId']}</td>
            <td class = 'editableData'>${elem['Name']}</td>
            <td class = 'editableData'>${elem['Title']}</td>
            <td class = 'albumIdHidden'>${elem['AlbumId']}</td>
            <td><button class='delBtns' value=${elem['ArtistId']}>Delete</button></td>
            <td><button class='updateBtns'>Update</button></td>
            </tr>
            
            `
        }
        
        addDelEventListeners();
        addUpdateEventListeners();
        });
    
    };   

                             //POST DATA BUTTON AND FUNCTIONALITY  

document.querySelector('#AddBtn').addEventListener('click',PostData);

    function PostData ()
    {
        
        const formContent = new FormData(document.querySelector('form'));
        fetch('http://localhost:5555/artist',{method:'POST',body:formContent});
        fetch('http://localhost:5555/album',{method:'POST',body:formContent});
        fetch('http://localhost:5555/artistId',{method:'POST',body:formContent});
    };



                        // DELETE ARTIST BUTTONS AND FUNCTIONALITY   

    function addDelEventListeners()
    {
        const deleteBtns = document.querySelectorAll('.delBtns');
        
        for (let button of deleteBtns)
        
        {
            button.addEventListener('click',(e)=>deleteArtist(e.target));
            
        }
        
        function deleteArtist(e)
        {

            fetch('http://localhost:5555/artist/'+ e.value,{method:'delete'});

        }   
    };


                        //UPDATE DATA BUTTONS AND FUNCTIONALITY

    function addUpdateEventListeners()
    {
        const editableFields = document.querySelectorAll('.editableData');

        for (let field of editableFields)
        {
            field.addEventListener('dblclick',(e)=> {
                e.target.setAttribute('contenteditable',true);
            }
                )
        }

        const updateBtns = document.querySelectorAll('.updateBtns');

        for (let updatebtn of updateBtns)

        {
            updatebtn.addEventListener('click', (e)=> updateData(e.target));
        
        }
    };

    function updateData(e)
    {
        const dataToGather = e.parentElement.parentElement.children;

        for (let i=0; i<dataToGather.length-2;i++)
        {
            console.log(dataToGather[i].innerText);
        }

        const artID = dataToGather[0].innerText;
        const albID = dataToGather[3].innerText;

        let jsonDataToSend = {};
        jsonDataToSend ['Name'] = dataToGather[1].innerText;
        jsonDataToSend ['Title'] = dataToGather[2].innerText;

        jsonDataToSend = JSON.stringify(jsonDataToSend);
       
        fetch('http://localhost:5555/artist/' + artID,
        {
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'put', body: jsonDataToSend

        })

        fetch('http://localhost:5555/album/',
        {
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'put', body: jsonDataToSend

        })
        fetch('http://localhost:5555/album/'  + albID,
        {
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'put', body: jsonDataToSend

        })

    };