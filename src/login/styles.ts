import {EStyleSheet} from '../config/EStyleSheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    backgroundColor: '#2b2b2b50',
    padding: '10rem',
    borderRadius: '20rem',
    width: '80%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  input: {
    borderRadius: '5rem',
    width: '100%',
    marginBottom: '10rem',
    borderWidth: '1rem',
    borderColor: '#fff',
    padding: '10rem',
  },
  inputLabel: {
    color: '#fff',
  },
  inputView: {
    marginVertical: '20rem',
  },
})

export default styles;