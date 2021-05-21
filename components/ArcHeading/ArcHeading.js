import React from 'react';


function ArcHeading({ text, arc, radius }) {
    const characters = text.split('');
    const degree = radius / characters.length;

    const DegreeLetter = ({ ch, deg }) => {
        return (
            <span
                key={`heading-span`}
                style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    color: '#000',
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: `0px ${radius}px 0px`,
                }}>
                {ch}
            </span>
        )
    }


    return (
        <div>
            <div
                style={{
                    position: 'relative',
                    top: -5,
                    left: -5,
                    height: 40,
                    width: 40,
                    borderRadius: 360,
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <img src="/assets/imgs/icons/twitter.png" alt="Logo" style={{ width: '25px', height: '25px' }} />
            </div>
            <div
                style={{
                    position: 'relative',
                    top: 10,
                    left: -45,
                    height: 40,
                    width: 40,
                    borderRadius: 360,
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <img src="/assets/imgs/icons/twitter.png" alt="Logo" style={{ width: '25px', height: '25px' }} />
            </div>

            <div style={{
                height: 250,
                width: 250,
                marginTop:-50,
                borderRadius: 360,
                backgroundColor: '#fff',
                justifyContent: 'center', alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: "0 15px rgba(0,0,0,0.2)",
                background: "#f7f7f7"
            }}>
<svg viewBox="0 0 500 500">
    <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
    <text width="500">
      <textPath xlinkHref="#curve">
        hey
      </textPath>
    </text>
  </svg>
                {/* <DegreeLetter ch="B" deg={-30} />
                <DegreeLetter ch="L" deg={-25} />
                <DegreeLetter ch="U" deg={-20} />
                <DegreeLetter ch="E" deg={-15} /> */}
                {/* {characters.map((char, i) => {
                    console.log("degree * i - arc / 2", 200 * i - arc / 2)
                    return (
                        <span
                            key={`heading-span-${i}`}
                            style={{
                                fontWeight: 'bold',
                                fontSize: 25,
                                color: '#000',
                                transform: `rotate(-28deg)`,
                                transformOrigin: `0px ${radius}px 0px`,
                            }}>
                            {char}
                        </span>
                    )
                })} */}

                <div
                    style={{
                        width: 100,
                        borderRadius: 360,

                    }}>
                    <img src="/assets/logo.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
}



export default ArcHeading;