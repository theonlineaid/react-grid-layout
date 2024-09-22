
import Dropdown from './Dropdown'


const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' },
];

function Test() {
    const handleSelect = (selectedOption: { value: string; label: string }) => {
        console.log('Selected option:', selectedOption);
    };
    return (
        <div>
            <Dropdown options={options} onSelect={handleSelect} />
        </div>
    )
}

export default Test