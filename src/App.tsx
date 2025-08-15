import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './App.css';

const PageCover = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const FullPagePhoto = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content full-photo">
        <div className="photo-container">
          <img src={props.photoSrc} alt={props.alt} onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/500/700?random=${Math.floor(Math.random() * 1000)}`;
          }} />
        </div>
        <div className="photo-text">
          <h3>{props.title}</h3>
          <p>{props.children}</p>
        </div>
      </div>
    </div>
  );
});

const PhotoGrid = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content photo-grid">
        <h3 className="grid-title">{props.title}</h3>
        <div className="grid-container">
          {props.photos.map((photo: any, index: number) => (
            <div key={index} className="grid-photo">
              <img src={photo.src} alt={photo.alt} onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/250/250?random=${Math.floor(Math.random() * 1000) + index}`;
              }} />
            </div>
          ))}
        </div>
        <div className="grid-text">
          <p>{props.children}</p>
        </div>
      </div>
    </div>
  );
});

const TextPage = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content text-page">
        <h2>{props.title}</h2>
        <div className="text-content">
          {props.children}
        </div>
      </div>
    </div>
  );
});

// Interactive Elements
const QuizPage = React.forwardRef((props: any, ref: any) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleAnswer = (answer: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent page turn
    setSelectedAnswer(answer);
    setShowResult(true);
  };
  
  return (
    <div className="page" ref={ref}>
      <div className="page-content quiz-page">
        <h3>🎯 History Quiz!</h3>
        <p>What happened on August 15th, 1945?</p>
        <div className="quiz-options">
          <button 
            onClick={(e) => handleAnswer('a', e)}
            className={selectedAnswer === 'a' ? 'selected' : ''}
          >
            A) World War I ended
          </button>
          <button 
            onClick={(e) => handleAnswer('b', e)}
            className={selectedAnswer === 'b' ? 'selected' : ''}
          >
            B) World War II ended in Pacific
          </button>
          <button 
            onClick={(e) => handleAnswer('c', e)}
            className={selectedAnswer === 'c' ? 'selected' : ''}
          >
            C) Moon landing
          </button>
        </div>
        {showResult && (
          <div className={`quiz-result ${selectedAnswer === 'b' ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === 'b' ? '✅ Correct! Japan surrendered, ending WWII in the Pacific!' : '❌ Try again! The answer is B.'}
          </div>
        )}
      </div>
    </div>
  );
});

const HiddenObjectPage = React.forwardRef((props: any, ref: any) => {
  const [foundItems, setFoundItems] = useState<string[]>([]);
  
  const handleFindItem = (item: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent page turn
    if (!foundItems.includes(item)) {
      setFoundItems([...foundItems, item]);
    }
  };
  
  return (
    <div className="page" ref={ref}>
      <div className="page-content hidden-object">
        <h3>🔍 Find the Hidden Items!</h3>
        <p>Click on the highlighted areas to find 3 hidden objects</p>
        <div className="game-image">
          <img src="/photos/IMG_20160721_155806.jpg" alt="Game" onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/400/300?random=100`;
          }} />
          <div 
            className={`hidden-item ${foundItems.includes('flower') ? 'found' : ''}`} 
            style={{top: '20%', left: '30%'}} 
            onClick={(e) => handleFindItem('flower', e)}
            title="Click to find!"
          ></div>
          <div 
            className={`hidden-item ${foundItems.includes('bird') ? 'found' : ''}`} 
            style={{top: '60%', left: '70%'}} 
            onClick={(e) => handleFindItem('bird', e)}
            title="Click to find!"
          ></div>
          <div 
            className={`hidden-item ${foundItems.includes('star') ? 'found' : ''}`} 
            style={{top: '40%', left: '15%'}} 
            onClick={(e) => handleFindItem('star', e)}
            title="Click to find!"
          ></div>
        </div>
        <p>Found: {foundItems.length}/3 items</p>
        {foundItems.length === 3 && (
          <p style={{color: '#4CAF50', fontWeight: 'bold'}}>🎉 Congratulations! You found them all!</p>
        )}
      </div>
    </div>
  );
});

const RevealPage = React.forwardRef((props: any, ref: any) => {
  const [revealed, setRevealed] = useState(false);
  
  const handleReveal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent page turn
    setRevealed(!revealed);
  };
  
  return (
    <div className="page" ref={ref}>
      <div className="page-content reveal-page">
        <h3>🎁 Click to Reveal!</h3>
        <div className="reveal-area" onClick={handleReveal}>
          {revealed ? (
            <div className="revealed-content">
              <p>🎉 Surprise! You found the hidden message!</p>
              <p>August 15th is truly a magical date!</p>
            </div>
          ) : (
            <div className="hidden-content">
              <p>Click here to reveal something special...</p>
              <p>✨ Magic awaits!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const TimelinePage = React.forwardRef((props: any, ref: any) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const events = [
    {year: 1945, event: "WWII ended in Pacific"},
    {year: 1969, event: "Woodstock began"},
    {year: 1977, event: "First SETI signal sent"},
    {year: 1994, event: "World Wide Web Consortium founded"}
  ];
  
  const handleYearClick = (year: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent page turn
    setSelectedYear(selectedYear === year ? null : year);
  };
  
  return (
    <div className="page" ref={ref}>
      <div className="page-content timeline">
        <h3>📅 Interactive Timeline</h3>
        <p>Click on any year to see what happened!</p>
        {events.map(event => (
          <div key={event.year} className="timeline-item" onClick={(e) => handleYearClick(event.year, e)}>
            <span className="year">{event.year}</span>
            {selectedYear === event.year && <span className="event">{event.event}</span>}
          </div>
        ))}
      </div>
    </div>
  );
});

// Famous People Page
const FamousPeoplePage = React.forwardRef((props: any, ref: any) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  
  const famousPeople = [
    {
      name: "Napoleon Bonaparte",
      year: 1769,
      image: "https://picsum.photos/100/100?random=200",
      fact: "French military leader and emperor"
    },
    {
      name: "Julia Child",
      year: 1912,
      image: "https://picsum.photos/100/100?random=201", 
      fact: "American chef and TV personality"
    },
    {
      name: "Ben Affleck",
      year: 1972,
      image: "https://picsum.photos/100/100?random=202",
      fact: "American actor and filmmaker"
    },
    {
      name: "Jennifer Lawrence",
      year: 1990,
      image: "https://picsum.photos/100/100?random=203",
      fact: "American actress"
    }
  ];
  
  const handlePersonClick = (name: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent page turn
    setSelectedPerson(selectedPerson === name ? null : name);
  };
  
  return (
    <div className="page" ref={ref}>
      <div className="page-content famous-people">
        <h3>🌟 Famous People Born on August 15th</h3>
        <p>Click on any person to learn more!</p>
        <div className="people-grid">
          {famousPeople.map(person => (
            <div 
              key={person.name} 
              className={`person-card ${selectedPerson === person.name ? 'selected' : ''}`}
              onClick={(e) => handlePersonClick(person.name, e)}
            >
              <img src={person.image} alt={person.name} />
              <h4>{person.name}</h4>
              <p className="year">{person.year}</p>
              {selectedPerson === person.name && (
                <p className="fact">{person.fact}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

function App() {
  return (
    <div className="App">
      <h1>August 15th Photobook</h1>
      <div className="mobile-hint">💡 Swipe left/right to turn pages • Tap to interact</div>
      <HTMLFlipBook 
        width={550}
        height={733}
        size="stretch"
        minWidth={280}
        maxWidth={1000}
        minHeight={350}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="demo-book"
        style={{}}
        startPage={0}
        drawShadow={true}
        flippingTime={800}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        showPageCorners={true}
        disableFlipByClick={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={20}
        renderOnlyPageLengthChange={false}
      >
        <PageCover>August 15th Journey</PageCover>
        
        <TextPage title="Welcome to Our Story">
          <p>August 15th is a special day that has been significant throughout history. We've collected some amazing moments that happened on this date over the years.</p>
          <p>Join us on a journey through time, exploring historical events and beautiful memories that share this special date.</p>
        </TextPage>

        <FullPagePhoto 
          photoSrc="/photos/IMG_20200815_120039.jpg"
          title="August 15th, 2020"
          alt="A special moment from 2020"
        >
          In 2020, the world was going through significant changes. This photo captures a moment of hope and resilience during challenging times.
        </FullPagePhoto>

        <PhotoGrid 
          title="Early Memories (2015-2016)"
          photos={[
            { src: "/photos/IMG_20150819_121153.jpg", alt: "2015 Memory" },
            { src: "/photos/IMG_20150919_143642.jpg", alt: "2015 Memory" },
            { src: "/photos/IMG_20160721_155806.jpg", alt: "2016 Memory" },
            { src: "/photos/IMG_20160813_152300.jpg", alt: "2016 Memory" }
          ]}
        >
          The early years captured in these precious moments.
        </PhotoGrid>

        <TextPage title="August 15th in History - Part 1">
          <p><strong>1945:</strong> World War II ended in the Pacific with Japan's surrender.</p>
          <p><strong>1969:</strong> The Woodstock Music & Art Fair began in New York.</p>
          <p><strong>1977:</strong> The first radio signal was sent to search for extraterrestrial life.</p>
          <p><strong>1994:</strong> The World Wide Web Consortium (W3C) was founded.</p>
        </TextPage>

        <QuizPage />

        <FullPagePhoto 
          photoSrc="/photos/IMG_20191214_150438_Bokeh.jpg"
          title="Beautiful Moments"
          alt="A beautiful bokeh photo"
        >
          Sometimes the most beautiful moments are the simple ones. This photo shows the magic of everyday life through the lens of creativity.
        </FullPagePhoto>

        <PhotoGrid 
          title="Summer Adventures (2017-2018)"
          photos={[
            { src: "/photos/IMG-20170828-WA0011.jpg", alt: "Summer 2017" },
            { src: "/photos/IMG_20180822_150946.jpg", alt: "Summer 2018" },
            { src: "/photos/IMG_20180908_135724.jpg", alt: "Late Summer 2018" },
            { src: "/photos/IMG_20181224_103541.jpg", alt: "Winter 2018" }
          ]}
        >
          Summer adventures and seasonal changes captured through the years.
        </PhotoGrid>

        <HiddenObjectPage />

        <TextPage title="August 15th in History - Part 2">
          <p><strong>2004:</strong> The Olympic Games opened in Athens, Greece.</p>
          <p><strong>2008:</strong> Michael Phelps won his 8th gold medal at the Beijing Olympics.</p>
          <p><strong>2013:</strong> The first successful landing of a spacecraft on a comet occurred.</p>
          <p><strong>2017:</strong> The solar eclipse crossed the United States from coast to coast.</p>
        </TextPage>

        <FullPagePhoto 
          photoSrc="/photos/IMG_20200815_120544_Bokeh.jpg"
          title="August 15th Magic"
          alt="Another beautiful moment"
        >
          Every August 15th brings its own special magic. This day connects us to history and to each other.
        </FullPagePhoto>

        <RevealPage />

        <PhotoGrid 
          title="Family & Friends (2019-2020)"
          photos={[
            { src: "/photos/IMG_20190313_100620.jpg", alt: "Spring 2019" },
            { src: "/photos/IMG_20200101_151438_Bokeh.jpg", alt: "New Year 2020" },
            { src: "/photos/IMG_20200415_150352_Bokeh.jpg", alt: "Spring 2020" },
            { src: "/photos/IMG_20200815_120134_Bokeh.jpg", alt: "August 2020" }
          ]}
        >
          Family and friends make every day special. These photos show the love and connection that surrounds us.
        </PhotoGrid>

        <TimelinePage />

        <FamousPeoplePage />

        <TextPage title="August 15th in History - Part 3">
          <p><strong>2019:</strong> The first all-female spacewalk was completed.</p>
          <p><strong>2020:</strong> The world was adapting to new ways of living and connecting.</p>
          <p><strong>2021:</strong> The Taliban took control of Afghanistan's capital.</p>
          <p><strong>2022:</strong> NASA's Artemis program prepared for future moon missions.</p>
        </TextPage>

        <FullPagePhoto 
          photoSrc="/photos/IMG_20211224_162515.jpg"
          title="Christmas Magic"
          alt="Christmas celebration"
        >
          Holiday celebrations bring families together and create lasting memories.
        </FullPagePhoto>

        <PhotoGrid 
          title="Seasonal Changes (2021-2022)"
          photos={[
            { src: "/photos/IMG_20211127_144024_Bokeh.jpg", alt: "Autumn 2021" },
            { src: "/photos/IMG_20220413_174905.jpg", alt: "Spring 2022" },
            { src: "/photos/IMG_20220522_081752.jpg", alt: "Late Spring 2022" },
            { src: "/photos/IMG_20220815_103703.jpg", alt: "Summer 2022" }
          ]}
        >
          Each season brings new memories and new opportunities to celebrate life's beautiful moments.
        </PhotoGrid>

        <TextPage title="August 15th in History - Part 4">
          <p><strong>2023:</strong> India's Chandrayaan-3 successfully landed on the moon.</p>
          <p><strong>2024:</strong> The Paris Olympics showcased human achievement and unity.</p>
          <p><strong>2025:</strong> A new chapter begins with endless possibilities!</p>
          <p>Every year, August 15th continues to be a day of significance and celebration.</p>
        </TextPage>

        <FullPagePhoto 
          photoSrc="/photos/IMG_20230325_174216.jpg"
          title="Spring Awakening"
          alt="Spring beauty"
        >
          Spring brings renewal and hope, just like each new day brings new possibilities.
        </FullPagePhoto>

        <PhotoGrid 
          title="Recent Memories (2023-2024)"
          photos={[
            { src: "/photos/IMG_20230817_160611_Bokeh.jpg", alt: "Summer 2023" },
            { src: "/photos/IMG_20231217_141840_Bokeh.jpg", alt: "Winter 2023" },
            { src: "/photos/IMG_20240229_094825.jpg", alt: "Early 2024" },
            { src: "/photos/IMG_20240821_174329.jpg", alt: "Summer 2024" }
          ]}
        >
          Recent memories show how much the world continues to change and grow.
        </PhotoGrid>

        <TextPage title="Growth Journey">
          <p>From the earliest days to now, we've grown in so many ways. Each photo captures a moment in time, a memory to cherish.</p>
          <p>As we look at these images, we see not just time passing, but life unfolding and discovering the world around us.</p>
        </TextPage>

        <FullPagePhoto 
          photoSrc="/photos/IMG_20240903_085259.jpg"
          title="Looking Forward"
          alt="Future possibilities"
        >
          As we look toward the future, we celebrate all the possibilities that lie ahead.
        </FullPagePhoto>

        <PhotoGrid 
          title="Special Moments Collection"
          photos={[
            { src: "/photos/IMG_20151213_112940.jpg", alt: "Special moment 1" },
            { src: "/photos/IMG_20160116_172227~2.jpg", alt: "Special moment 2" },
            { src: "/photos/IMG_20160503_083124.jpg", alt: "Special moment 3" },
            { src: "/photos/IMG_20160721_151633.jpg", alt: "Special moment 4" }
          ]}
        >
          These special moments remind us that every day is a gift and every memory is precious.
        </PhotoGrid>

        <TextPage title="The Power of Memories">
          <p>Memories are like treasures we carry with us throughout our lives. They remind us of who we are, where we've been, and what matters most.</p>
          <p>This photobook is a collection of these treasures, each page telling a story of love, growth, and the beautiful journey of life.</p>
        </TextPage>

        <FullPagePhoto 
          photoSrc="/photos/IMG_20160721_154128.jpg"
          title="Life's Beautiful Journey"
          alt="Life journey"
        >
          Life is a beautiful journey filled with moments of joy, love, and discovery.
        </FullPagePhoto>

        <PhotoGrid 
          title="More Beautiful Moments"
          photos={[
            { src: "/photos/IMG_20160721_155046.jpg", alt: "Beautiful moment 1" },
            { src: "/photos/IMG_20160721_160608.jpg", alt: "Beautiful moment 2" },
            { src: "/photos/IMG_20160721_160942.jpg", alt: "Beautiful moment 3" },
            { src: "/photos/IMG_20160721_161351.jpg", alt: "Beautiful moment 4" }
          ]}
        >
          Every moment captured in these photos tells a story of love, laughter, and life.
        </PhotoGrid>

        <TextPage title="August 15th - A Day of Celebration">
          <p>August 15th is not just any day - it's a day that has witnessed countless important events throughout history.</p>
          <p>From world-changing moments to personal celebrations, this date connects us to the past while we look toward the future.</p>
        </TextPage>

        <FullPagePhoto 
          photoSrc="/photos/IMG_20160817_171757.jpg"
          title="Summer Memories"
          alt="Summer memories"
        >
          Summer memories are filled with warmth, adventure, and the joy of being together.
        </FullPagePhoto>

        <PhotoGrid 
          title="Family Traditions"
          photos={[
            { src: "/photos/IMG_20161031_182557.jpg", alt: "Halloween 2016" },
            { src: "/photos/IMG_20170225_165113.jpg", alt: "Winter 2017" },
            { src: "/photos/IMG_20170325_165559.jpg", alt: "Spring 2017" },
            { src: "/photos/IMG_20170412_172730.jpg", alt: "Spring 2017" }
          ]}
        >
          Family traditions create bonds that last a lifetime and memories that warm our hearts.
        </PhotoGrid>

        <TextPage title="Looking Forward">
          <p>As we look forward to the future, we celebrate not just the days ahead, but all the wonderful moments that have led us here.</p>
          <p>Every photo tells a story, every memory is precious, and every August 15th brings new possibilities.</p>
        </TextPage>

        <PageCover>The End</PageCover>
      </HTMLFlipBook>
    </div>
  );
}

export default App;
