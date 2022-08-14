import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Loader } from '../DataTransitionHandlers';
import { useDebounce } from '../helperFns';

import './AutoSuggestion.css';

function AutoSuggestion({
  inputTypeProps = {},
  totalList,
  loaderMsg = 'Searching...',
  onSearchKeyChange,
  defaultValue = '',
  onSuggestionClick,
  minLengthToShowSuggestion = 1,
  notEnoughTextLengthMsg = '',
  customListComponent
}) {
  const {
    label = '',
    placeholder = '',
    disabled = false,
    caption = '',
    inputTextFontSize = 24,
    dropDownStyle = {},
    captionStyle = {
      fontSize: 14,
      fontWeight: 'normal',
    },
    name = '',
  } = inputTypeProps;

  const [searchKey, setSearchKey] = useState(defaultValue);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const filteredSuggestion = totalList;

  const [activeValueId, setActiveValueId] = useState('');

  const handleKeyDown = (event) => {
    const { key } = event;
    if (key.toLowerCase() === 'arrowup') {
      if (!activeValueId) setActiveValueId('');
      if (activeValueId) setActiveValueId(activeValueId - 1);
    }
    if (key.toLowerCase() === 'arrowdown') {
      if (activeValueId === '') setActiveValueId(0);
      else if (activeValueId === filteredSuggestion.length - 1)
        setActiveValueId(0);
      else setActiveValueId(activeValueId + 1);
    }
    if (key.toLowerCase() === 'enter') {
      event.preventDefault();
      const { value } = filteredSuggestion[activeValueId];
      onSuggestionClick(filteredSuggestion[activeValueId]);
      setSearchKey(value);
      setActiveValueId('');
      setShowSuggestion(false);
    }
  };

  const onHoverList = ({ valueId, value }) => {
    setActiveValueId('');
    onSuggestionClick({ valueId, value });
    setSearchKey(value);
  }

  const getSuggestionsLists = () => {
    if (Array.isArray(filteredSuggestion) && filteredSuggestion.length) {
      return (
        <>
          {filteredSuggestion.map(({ value, valueId }, index) => (
            <>
              {
                customListComponent ? customListComponent({ valueId, value }, onHoverList, `${
                  activeValueId === index && 'list-item-active'
                } cursor-pointer list-item px-3 pt-2`) : 
                <li
                  key={valueId}
                  className={`${
                    activeValueId === index && 'list-item-active'
                  } cursor-pointer list-item px-3 pt-2`}
                  onMouseDown={() => onHoverList({ valueId, value })}
                >
                  {value}
                </li>
              }
            </>
          ))}
        </>
      );
    } else if (
      !Array.isArray(filteredSuggestion) &&
      (filteredSuggestion === 'NOT_ENOUGH_LENGTH' || !filteredSuggestion)
    ) {
      if (notEnoughTextLengthMsg) return <li>{notEnoughTextLengthMsg}</li>;
      return <li>Please type minimum {minLengthToShowSuggestion} letter</li>;
    } else if (
      !Array.isArray(filteredSuggestion) &&
      filteredSuggestion === 'LOADING'
    ) {
      return (
        <li>
          <Loader message={loaderMsg} />
        </li>
      );
    } else if (
      !Array.isArray(filteredSuggestion) &&
      filteredSuggestion === 'EMPTY'
    ) {
      return <li className="px-3 py-2">No Item in the Suggestion</li>;
    } else return <li>Some Error Occurred. Please Retry after sometime</li>;
  };

  const debouncedSuggestionSearch = useDebounce(
    (searchWords) => onSearchKeyChange(searchWords),
    1000
  );

  return (
    <>
      {label && <Form.Label className="font_14_normal">{label}</Form.Label>}
      <InputGroup
        className="d-flex align-items-center"
        style={{
          flexDirection: 'column',
        }}
      >
        <Form.Control
          type="text"
          style={{
            width: '99%',
            height: '99%',
            fontSize: inputTextFontSize,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          value={searchKey}
          disabled={disabled}
          onChange={(e) => {
            const value = e.target.value;
            setSearchKey(value);
            debouncedSuggestionSearch(value.trim());
            if (!value) {
              onSuggestionClick({ value: '', valueId: '' });
            }
          }}
          placeholder={placeholder || ''}
          name={name}
          onBlur={(e) => {
            setShowSuggestion(false);
            setActiveValueId('');
          }}
          onFocus={() => setShowSuggestion(true)}
          onKeyDown={handleKeyDown}
        />
        {searchKey && showSuggestion && (
          <div
            className={`auto-suggestion-wrapper ${
              dropDownStyle.marginTop ? '' : 'mt-5'
            }`}
            style={dropDownStyle}
          >
            {
              <ul className="list-wrapper flex-column d-flex p-0 mb-2 font_14_normal">
                {getSuggestionsLists()}
              </ul>
            }
          </div>
        )}
      </InputGroup>
      <span style={captionStyle}>{caption}</span>
    </>
  );
}

export default AutoSuggestion;
