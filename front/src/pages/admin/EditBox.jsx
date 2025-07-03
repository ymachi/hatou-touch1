import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from "../../context/token";

const EditBox = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   
   const [inputs, setInputs] = useState({
      name: "",
      category: "",
      description: "",
      price: {
         amount: "",
         currency: "",
      },
      image: "",
      ingredients: []
   });
   
   const [message, setMessage] = useState("");

   useEffect(() => {
      const fetchOneBox = async () => {
         try {
            const res = await axios.get(`/api/boxs/${id}`);
            setInputs(res.data);
         } catch (e) {
            toast.error("Erreur lors de la récupération de la box.");
         }
      };

      fetchOneBox();
   }, [id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "image") {
         setInputs({ ...inputs, image: e.target.files[0] });
      }else if(name === "amount" || name === "currency"){
         setInputs({...inputs, price: {...inputs.price, [name]: value}})
      }else {
         setInputs({ ...inputs, [name]: value });
      }
      setMessage("");
   };

   const handleIngredient = (e, index) => {
      const { value } = e.target;
      const newIngredients = [...inputs.ingredients];
      newIngredients[index] = value;
      setInputs({ ...inputs, ingredients: newIngredients });
   };

   const handleAddIngredient = () => {
      setInputs({ ...inputs, ingredients: [...inputs.ingredients, ""] });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
   
      try {
         const formData = new FormData();
         const { name, category, description, price, image } = inputs;
     
         if (name.trim() === "" ||
            category.trim() === "" ||
            description.trim() === "" ||
            price.amount <= 0 ||
            !image) {
            return toast.warning("Veuillez remplir tous les champs");
         }
         
         formData.append('name', name);
         formData.append('category', category);
         formData.append('description', description);
         formData.append('amount', price.amount);
         formData.append('currency', price.currency);
         formData.append('image', image);

         await axios.put(`/api/boxs/edit/${id}`, formData, {headers: token()})
         
         toast.success("Modification bien effectuée.");
         navigate("/admin/boxs/dashboard");
      } catch (e) {
         console.log(e)
         toast.error("Modification impossible.");
      }
   };

   return (
      <main className="content">
         <div className="container">
            <section className="intro">
               <h1>Modifier une box</h1>
            </section>
            <form className="add-dashboard" encType="multipart/form-data" onSubmit={handleSubmit} method="post">
               <div className="parentparts">
                  <section className="partone">
                     <label htmlFor="name">Nom du produit</label>
                     <input type="text" id="name" name="name" placeholder="Nom du produit" value={inputs.name} onChange={handleChange} />
                     <label htmlFor="image">Image</label>
                     <input type="file" id="image" name="image" onChange={handleChange} />
                     <label htmlFor="description">Description du produit</label>
                     <input type="text" id="description" name="description" placeholder="Description du produit" value={inputs.description} onChange={handleChange} />
                     <label htmlFor="amount">Prix du produit</label>
                     <input type="number" id="amount" name="amount" placeholder="Prix du produit" value={inputs.price?.amount} onChange={handleChange} />
                     <label htmlFor="category">Category</label>
                     <input type="text" id="category" name="category" placeholder="Catégory" value={inputs.category} onChange={handleChange} />
                     
                  </section>
               </div>
               <input type="submit" value="Ajouter" />
            </form>
         </div>
      </main>
   );
}

export default EditBox;
