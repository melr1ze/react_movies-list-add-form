import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../App';

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
  });

  const validateUrl = (value: string) => {
    if (!value) {
      return 'Field is required';
    }

    if (!URL_REGEX.test(value)) {
      return 'Please enter a valid URL';
    }

    return '';
  };

  const handleChange = (name: string, newValue: string) => {
    setMovie(previousMovie => ({
      ...previousMovie,
      [name]: newValue,
    }));

    let errorText = '';

    if (name === 'imgUrl' || name === 'imdbUrl') {
      errorText = validateUrl(newValue);
    } else if (!newValue) {
      errorText = 'Field is required';
    }

    setErrors(previousErrors => ({
      ...previousErrors,
      [name]: errorText,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const imgUrlError = validateUrl(movie.imgUrl);
    const imdbUrlError = validateUrl(movie.imdbUrl);
    const titleError = movie.title ? '' : 'Field is required';

    if (imgUrlError || imdbUrlError || titleError) {
      setErrors({
        title: titleError,
        imgUrl: imgUrlError,
        imdbUrl: imdbUrlError,
      });

      return;
    }

    onAdd(movie);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        // Используем newValue вместо сокращений по чеклисту
        onChange={newValue => handleChange('title', newValue)}
        errorMessage={errors.title}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newValue => handleChange('imgUrl', newValue)}
        errorMessage={errors.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => handleChange('imdbUrl', newValue)}
        errorMessage={errors.imdbUrl}
        required
      />

      <button type="submit" className="button is-primary">
        Add
      </button>
    </form>
  );
};
