import React from 'react';

var selectedIndex = 1;
var updateId;
var editing = false;
var ADD

class Home extends React.Component{
	state={
		text:'',
		ADD: "Next",
		mywishes:[{_id:1,product:"loading"}]
	}

	handleEdit(id){
		console.log("editing");
		fetch('/'+id)
	    .then(res=>res.json())
	    .then(res2=>{
	      console.log(res2.item)
	      this.setState({
	        	text:res2.item
	      	})
	    })
	    editing = true
	    selectedIndex = -1
	    updateId = id
	}

	handleDelete(id){
	    fetch('/remove/'+id,{
	    	method:"delete"
	    })
	    .then(res=>res.json())
	    .then(res2=>{
	      console.log(res2)
	      const newWishes = this.state.mywishes.filter(item=>{
	        return item._id !== res2._id
	      })
	      console.log(newWishes);
	      this.setState({
	        mywishes:newWishes
	      })
	    })
  	}

	componentDidMount(){
	    fetch('/data')
	    .then(res=>res.json())
	    .then(res2=>{
	      	console.log(res2)
	      	this.setState({
	        	mywishes:res2
	      		})
	    	})
  	}

  	validate =()=>{
		let textError: ''
		if (!this.state.text){
			textError ="Text Cannot be empty"
		}

		if(textError){
			this.setState({ textError });
			return false;
		}
		return true;
  	}

	handleSubmit(e){
        e.preventDefault();

        const isvalid = this.validate();
        if (isvalid){

        	var data = new URLSearchParams();
	        for(const pair of new FormData(e.target)){
	           data.append(pair[0],pair[1])
	        }

	        if(selectedIndex === 1){
	   	        fetch('/sent',{
		            method:"post",
		            body:data,
		           
		        }).then(res=>res.json())
		        .then(res2 => {
		        	console.log(res2)
		        	this.setState({
		        		text:'',
		        		textError: '',
		        		mywishes:[...this.state.mywishes,res2]
		        	})
		        }); 
		    } else {
		    	fetch('/update/'+updateId,{
		            method:"put",
		            body:data,
		           
		        }).then(res=>res.json())
		        .then(res2 => {
		        	console.log(res2)
		        	const newWishes = this.state.mywishes

		        	var Index = -1
					for(var i = 0; i < newWishes.length; i++) {
					    if(newWishes[i]._id === res2._id) {
					        Index = i;
					        break;
					    }
					}

		        	newWishes[Index].item = res2.item

		        	this.setState({
		        		text:'',
		        		textError: '',
		        		mywishes:newWishes
		        	})
		        }); 
		    }
		    editing = false;
		    selectedIndex = 1;
		}
  	}

	render(){

			if (editing) {
	            ADD = "update"
		    } else {
		        ADD = "add"
		    }

		const list = this.state.mywishes.map(item=>{
			return (<tr>
			    	<td><a className="collection-item" key={item._id} >{item.item}</a></td>
			    	<td><button  className="btn btn-primary" onClick={()=>this.handleEdit(item._id)} type="submit">Edit</button></td>
			        <td><button className="btn btn-primary" onClick={()=>this.handleDelete(item._id)} type="submit">Delete</button></td>
			    </tr>)
		})
		return(
			<div>
				<form onSubmit={(e)=>this.handleSubmit(e)}>
					<input 
						type="text" 
						name="item" 
						value={this.state.text} 
						onChange={(e)=>this.setState({text:e.target.value})}
						/>
						<div style={{ fontsize : 12, color:"red"}}>
						{this.state.textError}
						</div>
			
						
						<button type="submit" className="waves-effect waves-light btn">{ADD}</button>
				</form>
				<table className="table table-striped " style={{ marginTop: 30 }}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { list }
                    </tbody>
                </table>
			</div>
			)

	
		}
}


export default Home;

