
export function Button(props){

    return(
        <button type={props.type} className={props.class}>
            {props.titulo}
        </button>
    );
} 