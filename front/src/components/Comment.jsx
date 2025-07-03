import { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../context/token";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Stars from "./Stars";
import '../css/comments.css';

const Comment = () => {
    const { user } = useAuth();
    const [inputs, setInputs] = useState({
        content: "",
        rating: 0
    });
    const [comments, setComments] = useState([]);
    const [thankYou, setThankYou] = useState(false); // 🆕

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get("/api/avis", { headers: token() });
                setComments(res.data);
            } catch (e) {
                console.log(e.response?.data);
            }
        };
        fetchComments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { content, rating } = inputs;
            if (content.trim() === "" || rating <= 0 || rating > 5) {
                return toast.error("Veuillez remplir tous les champs.");
            }

            const res = await axios.post(`/api/avis/new`, inputs, { headers: token() });

            setComments([...comments, res.data.comment]);
            toast.success("Commentaire ajouté avec succès.");
            setInputs({ content: "", rating: 0 });

            setThankYou(true);
            setTimeout(() => setThankYou(false), 3000);

        } catch (e) {
            toast.error(e.response?.data?.message || "Erreur");
        }
    };

    return (
        <main>
            <section className="comment-section">
                <h2>{user && user.token ? "Laissez un commentaire" : "Les feedbacks"}</h2>
                
                {user && user.token && (
                    <>
                        <form className="comment-form" onSubmit={handleSubmit}>
                            <label htmlFor="rating">Note :</label>
                            <Stars rating={inputs.rating} setRating={(rating) => setInputs({ ...inputs, rating })} />
                            <label htmlFor="content">Commentaire:</label>
                            <textarea
                                id="content"
                                name="content"
                                rows="4"
                                value={inputs.content}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <button type="submit">Poster</button>
                        </form>
                        {thankYou && <p className="thankyou-msg">Merci pour votre avis ❤️</p>}
                    </>
                )}

                <section className="comments-display">
                    <h3>Commentaires: </h3>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            comment && comment.content ? (
                                <article className="comment" key={index}>
                                    <Stars rating={comment.rating} setRating={() => {}} />
                                    <p><strong>{comment.firstname} {comment.lastname}</strong></p>
                                    <p>{comment.content}</p>
                                    <p>{new Date(comment.createdAt).toLocaleString()}</p>
                                </article>
                            ) : null
                        ))
                    ) : (
                        <p>Aucun commentaire disponible.</p>
                    )}
                </section>
            </section>
        </main>
    );
};

export default Comment;
