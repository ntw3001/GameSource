import * as yup from 'yup'

const ArticleSchema = {
  game: yup.string()
    .required('We need to know what the game is'),
  title: yup.string()
    .required('Tell us a title at least, come on')
    .min(10, 'No, that\'s too short')
    .max(70, 'No, that\'s too long'),
  article: yup.string()
    .required('didn\'t your mother teach you to write an excerpt when you submit an article?')
    .min(100, 'Was hoping to see a little more honest exerption here')
    .max(600, 'Hold off on those strenuous excerptions it\'s too much'),
  // editor: yup.string()
  // .required('WHO ARE YOU')
  // .min(5, 'That can\'t possibly be your name'),
  // .max(30, 'That\'s a long name you have there'),
  rating: yup.number()
    .required('Rate it as well please')
    .notOneOf(['Select a rating'], 'You have to pick one of the ratings I\'m offering you'),
  img: yup.string()
    .required('And an image too please')
    .url('Well that\'s not a bloody URL now is it'),
  }

export default ArticleSchema
