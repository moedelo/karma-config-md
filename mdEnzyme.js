import enzyme, { render, shallow, mount, ShallowWrapper, ReactWrapper, configure, EnzymeAdapter } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default enzyme;
export {
    render,
    shallow,
    mount,
    ShallowWrapper,
    ReactWrapper,
    configure,
    EnzymeAdapter
};
