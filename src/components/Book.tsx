import React, { useState, useEffect, useRef } from 'react';
import { Page } from './Page';
import { content, Language, Project } from '../data';
import { ArrowLeft, ArrowRight, Globe, MousePointerClick, Play, Pause, Box, X, RotateCcw, Volume2, VolumeX, Mail, Phone, ExternalLink, MapPin, Facebook, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithLoader } from './ImageWithLoader';
import ReactPlayer from 'react-player';
import { QRCodeSVG } from 'qrcode.react';

const Player = ReactPlayer as any;

// Sound Utilities
let globalMuted = true; // Default to muted as requested

const flipAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2564/2564-preview.mp3');
flipAudio.volume = 0.25;
flipAudio.preload = 'auto';

const hoverAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
hoverAudio.volume = 0.15;
hoverAudio.preload = 'auto';

const clickAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
clickAudio.volume = 0.3;
clickAudio.preload = 'auto';

const playFlipSound = () => {
  if (globalMuted) return;
  flipAudio.currentTime = 0;
  flipAudio.play().catch(e => console.log("Audio play blocked or failed", e));
};

const playHoverSound = () => {
  if (globalMuted) return;
  hoverAudio.currentTime = 0;
  hoverAudio.play().catch(e => console.log("Audio play blocked or failed", e));
};

const playClickSound = () => {
  if (globalMuted) return;
  clickAudio.currentTime = 0;
  clickAudio.play().catch(e => console.log("Audio play blocked or failed", e));
};

// Standalone ProjectPage Component
const ProjectPage = ({ project, index, lang, globalMuted: isMuted }: { project: Project, index: number, lang: Language, globalMuted: boolean }) => {
  const isEven = index % 2 === 0;
  const [showMedia, setShowMedia] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [played, setPlayed] = useState(0);

  // Sync with global mute but allow local override
  useEffect(() => {
    setMuted(isMuted);
  }, [isMuted]);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const playerRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset media state when project changes
  useEffect(() => {
    setShowMedia(false);
    setPlaying(true);
    setPlayed(0);
    setShowStickyHeader(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [project.id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setShowStickyHeader(scrollTop > 100);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPlayed(val);
    playerRef.current?.seekTo(val);
  };

  const MediaOverlay = () => (
    <div className="absolute inset-0 z-20 bg-black flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex flex-col">
          <span className="text-amber-500 text-[9px] font-bold uppercase tracking-widest">{project.category[lang]}</span>
          <h4 className="text-white text-[12px] font-bold uppercase">{project.title[lang]}</h4>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); playClickSound(); setShowMedia(false); }}
          onMouseEnter={playHoverSound}
          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-all"
        >
          <X size={18} />
        </button>
      </div>

      {/* Media Content */}
      <div className="flex-1 relative overflow-hidden">
        {project.media?.type === 'video' ? (
          <div className="w-full h-full relative group">
            <Player
              ref={playerRef}
              url={project.media.url}
              width="100%"
              height="100%"
              playing={playing}
              muted={muted}
              onProgress={(state: any) => setPlayed(state.played)}
              config={{
                youtube: {
                  playerVars: { showinfo: 0, controls: 0, rel: 0, modestbranding: 1 }
                } as any
              }}
            />
            
            {/* Custom Video Controls Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4">
              <div className="flex flex-col gap-3">
                {/* Seeker */}
                <div className="w-full flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={played}
                    onChange={handleSeekChange}
                    className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setPlaying(!playing)}
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>
                    <button 
                      onClick={() => { setPlayed(0); playerRef.current?.seekTo(0); }}
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      <RotateCcw size={18} />
                    </button>
                    <button 
                      onClick={() => setMuted(!muted)}
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                  <div className="text-white/50 text-[9px] font-mono tracking-widest uppercase">
                    Interactive Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <iframe 
              src={project.media?.url} 
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; vr"
              title="Project Media"
            />
            {/* 3D Interaction Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md text-white/80 text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <MousePointerClick size={10} />
                Drag to Orbit • Scroll to Zoom
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const MediaTrigger = () => {
    if (!project.media) return null;
    
    return (
      <button
        onClick={(e) => { e.stopPropagation(); playClickSound(); setShowMedia(true); }}
        onMouseEnter={playHoverSound}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/90 hover:bg-amber-500 hover:text-white text-stone-900 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg transition-all group"
      >
        {project.media.type === 'video' ? <Play size={14} className="fill-current" /> : <Box size={14} />}
        <span className="text-[9px] font-bold uppercase tracking-wider">
          {project.media.type === 'video' ? 'Watch Video' : 'View 3D Model'}
        </span>
      </button>
    );
  };

  const ProjectDetailsSection = () => {
    if (!project.details) return null;

    return (
      <div className="mt-8 pt-8 border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Key Facts */}
          <div>
            <h5 className="text-[13px] md:text-[12px] font-black uppercase text-stone-400 tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500"></div>
              {lang === 'en' ? 'Key Facts' : 'Thông Tin Chính'}
            </h5>
            <div className="space-y-3">
              {project.details.facts.map((fact, i) => (
                <div key={i} className="flex justify-between items-end border-b border-stone-100 pb-2 md:pb-1 group cursor-default" onMouseEnter={playHoverSound}>
                  <span className="text-[11px] md:text-[9px] text-stone-400 uppercase font-bold">{fact.label[lang]}</span>
                  <span className="text-[11px] md:text-[9px] font-black text-stone-900 group-hover:text-amber-600 transition-colors">{fact.value[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <h5 className="text-[13px] md:text-[12px] font-black uppercase text-stone-400 tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500"></div>
              {lang === 'en' ? 'Materials' : 'Vật Liệu'}
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.details.materials[lang].map((mat, i) => (
                <span 
                  key={i} 
                  onMouseEnter={playHoverSound}
                  className="px-3 py-1.5 md:px-2 md:py-1 bg-stone-50 text-[11px] md:text-[9px] font-bold text-stone-600 uppercase tracking-wider border border-stone-100 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all cursor-default"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Sustainability */}
          <div>
            <h5 className="text-[13px] md:text-[12px] font-black uppercase text-stone-400 tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500"></div>
              {lang === 'en' ? 'Sustainability' : 'Bền Vững'}
            </h5>
            <div className="space-y-3 md:space-y-2">
              {project.details.sustainability[lang].map((item, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-2 group cursor-default" onMouseEnter={playHoverSound}>
                  <div className="w-1.5 h-1.5 md:w-1 md:h-1 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform"></div>
                  <span className="text-[11px] md:text-[9px] font-medium text-stone-600 group-hover:text-stone-900 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Determine Layout Variant based on index
  const layoutVariant = index % 4;

  const renderLayout = () => {
    switch (layoutVariant) {
      case 0: // Layout A: Minimalist Hero
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col z-10 relative overflow-visible"
          >
            {/* Bold Header Block */}
            <div className="bg-stone-900 text-white p-5 md:p-6 mb-4 flex justify-between items-end">
              <div className="min-w-0">
                <h3 className="text-[18px] md:text-[12px] font-sans font-black uppercase leading-none tracking-tighter truncate">{project.title[lang]}</h3>
                <span className="text-amber-500 text-[11px] md:text-[9px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mt-2 block">{project.category[lang]}</span>
              </div>
              <div className="text-right shrink-0 ml-2">
                <span className="text-[18px] md:text-[12px] font-sans font-black opacity-20 leading-none">0{index + 1}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Main Image */}
              <div className="w-full md:flex-1 relative overflow-hidden bg-stone-100 border-b-4 md:border-b-0 md:border-r-4 border-stone-900 aspect-video md:aspect-auto md:h-[50vh]">
                {showMedia ? <MediaOverlay /> : (
                  <>
                    <ImageWithLoader src={project.image} alt="Main" className="object-cover w-full h-full" />
                    <MediaTrigger />
                  </>
                )}
              </div>
              
              {/* Vertical Info Rail (Horizontal on mobile) */}
              <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between py-2 gap-4 md:gap-0">
                <div className="flex flex-row md:flex-col gap-6 md:gap-4 flex-1">
                  <div className="border-b border-stone-300 pb-2 md:pb-2 group cursor-default" onMouseEnter={playHoverSound}>
                    <span className="block text-[11px] md:text-[9px] font-black uppercase text-stone-400 mb-1">Year</span>
                    <span className="block text-[12px] md:text-[9px] font-bold text-stone-900 group-hover:text-amber-600 transition-colors">{project.year}</span>
                  </div>
                  <div className="border-b border-stone-300 pb-2 md:pb-2 group cursor-default" onMouseEnter={playHoverSound}>
                    <span className="block text-[11px] md:text-[9px] font-black uppercase text-stone-400 mb-1">Loc</span>
                    <span className="block text-[12px] md:text-[9px] font-bold text-stone-900 truncate group-hover:text-amber-600 transition-colors">{project.specs.location.split(',')[0]}</span>
                  </div>
                </div>
                <div className="hidden md:block origin-bottom-right -rotate-90 translate-x-full whitespace-nowrap">
                  <span className="text-[24px] md:text-[60px] font-sans font-black text-stone-100 uppercase leading-none">PROJECT</span>
                </div>
              </div>
            </div>

            {/* Bottom Description */}
            <div className="mt-6 md:mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 items-start">
              <div className="md:col-span-8">
                <p className="text-[13px] md:text-[9px] text-stone-600 leading-relaxed font-medium text-justify">
                  {project.description[lang]}
                </p>
              </div>
              <div className="flex md:col-span-4 gap-2">
                {project.images.slice(0, 2).map((img, i) => (
                  <div key={i} className="flex-1 aspect-square relative overflow-hidden bg-stone-900">
                    <ImageWithLoader src={img} alt="Detail" className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            <ProjectDetailsSection />
          </motion.div>
        );

      case 1: // Layout B: Asymmetrical Grid
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col z-10 relative overflow-visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 md:gap-3 h-auto md:h-full">
              {/* Title Block */}
              <div className="col-span-1 md:col-span-5 md:row-span-2 flex flex-col justify-center">
                <span className="text-amber-600 text-[11px] md:text-[9px] font-bold uppercase tracking-widest mb-1">{project.id.toUpperCase()}</span>
                <h3 className="text-[18px] md:text-[12px] font-sans font-black text-stone-900 leading-tight mb-2 uppercase tracking-tighter md:whitespace-normal">{project.title[lang]}</h3>
                <div className="w-12 h-1 bg-stone-900"></div>
              </div>

              {/* Main Image */}
              <div className="col-span-1 md:col-span-7 md:row-span-4 relative overflow-hidden bg-stone-50 border-l-0 md:border-l-8 border-stone-900 aspect-video md:aspect-auto min-h-[200px]">
                {showMedia ? <MediaOverlay /> : (
                  <>
                    <ImageWithLoader src={project.image} alt="Main" className="object-cover w-full h-full" />
                    <MediaTrigger />
                  </>
                )}
              </div>

              {/* Description Block */}
              <div className="col-span-1 md:col-span-5 md:row-span-2 py-2">
                <p className="text-[13px] md:text-[9px] text-stone-600 leading-relaxed text-justify font-medium">
                  {project.description[lang]}
                </p>
              </div>

              {/* Small Detail Images */}
              <div className="grid grid-cols-2 gap-2 col-span-1 md:col-span-6 md:grid-cols-2 md:contents">
                <div className="col-span-1 md:col-span-3 md:row-span-2 relative overflow-hidden bg-stone-900 aspect-square md:aspect-auto">
                  <ImageWithLoader src={project.images[0]} alt="Detail" className="object-cover w-full h-full opacity-70" />
                </div>
                <div className="col-span-1 md:col-span-3 md:row-span-2 relative overflow-hidden bg-stone-900 aspect-square md:aspect-auto">
                  <ImageWithLoader src={project.images[1]} alt="Detail" className="object-cover w-full h-full opacity-70" />
                </div>
              </div>

              {/* Specs Block */}
              <div className="col-span-1 md:col-span-6 md:row-span-2 bg-stone-900 text-white p-5 md:p-3 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:gap-x-4 md:gap-y-2">
                  <div className="flex justify-between border-b border-stone-700 pb-1 group cursor-default" onMouseEnter={playHoverSound}>
                    <span className="text-[11px] md:text-[9px] text-stone-500 uppercase font-black">Status</span>
                    <span className="text-[11px] md:text-[9px] font-bold text-amber-500 group-hover:scale-110 transition-transform">{project.specs.status[lang]}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-700 pb-1 group cursor-default" onMouseEnter={playHoverSound}>
                    <span className="text-[11px] md:text-[9px] text-stone-500 uppercase font-black">Year</span>
                    <span className="text-[11px] md:text-[9px] font-bold group-hover:scale-110 transition-transform">{project.year}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-700 pb-1 group cursor-default" onMouseEnter={playHoverSound}>
                    <span className="text-[11px] md:text-[9px] text-stone-500 uppercase font-black">Loc</span>
                    <span className="text-[11px] md:text-[9px] font-bold truncate group-hover:scale-110 transition-transform">{project.specs.location.split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-700 pb-1 group cursor-default" onMouseEnter={playHoverSound}>
                    <span className="text-[11px] md:text-[9px] text-stone-500 uppercase font-black">Area</span>
                    <span className="text-[11px] md:text-[9px] font-bold group-hover:scale-110 transition-transform">{project.specs.area}</span>
                  </div>
                </div>
              </div>
            </div>
            <ProjectDetailsSection />
          </motion.div>
        );

      case 2: // Layout C: Clean Split
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row z-10 relative overflow-visible h-auto md:h-full"
          >
            {/* Left/Top: Dark Info Panel */}
            <div className="w-full md:w-1/3 bg-stone-900 text-white p-6 flex flex-col justify-between shrink-0">
              <div>
                <span className="text-amber-500 text-[11px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase mb-4 md:mb-8 block">THE PROJECT</span>
                <h3 className="text-[18px] md:text-[12px] font-sans font-black uppercase leading-[0.85] mb-4 md:mb-8 flex flex-wrap gap-x-2 md:block">
                  {project.title[lang].split(' ').map((word, i) => (
                    <span key={i} className="md:block">{word}</span>
                  ))}
                </h3>
                <div className="w-12 h-1 md:h-2 bg-amber-500 mb-4 md:mb-8"></div>
                <p className="text-[13px] md:text-[9px] text-stone-400 leading-relaxed text-justify opacity-80">
                  {project.description[lang]}
                </p>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-row md:flex-col gap-6 md:gap-4">
                <div className="flex flex-col group cursor-default" onMouseEnter={playHoverSound}>
                  <span className="text-[11px] md:text-[9px] font-bold text-stone-500 uppercase mb-1">Year</span>
                  <span className="text-[11px] md:text-[9px] font-bold group-hover:text-amber-500 transition-colors">{project.year}</span>
                </div>
                <div className="flex flex-col group cursor-default" onMouseEnter={playHoverSound}>
                  <span className="text-[11px] md:text-[9px] font-bold text-stone-500 uppercase mb-1">Area</span>
                  <span className="text-[11px] md:text-[9px] font-bold group-hover:text-amber-500 transition-colors">{project.specs.area}</span>
                </div>
              </div>
            </div>

            {/* Right/Bottom: Image Gallery */}
            <div className="w-full md:w-2/3 flex flex-col p-4 bg-white min-h-0">
              <div className="relative overflow-hidden mb-4 shadow-xl aspect-video md:aspect-auto md:flex-1">
                {showMedia ? <MediaOverlay /> : (
                  <>
                    <ImageWithLoader src={project.image} alt="Main" className="object-cover w-full h-full" />
                    <MediaTrigger />
                  </>
                )}
              </div>
              <div className="h-32 md:h-1/3 grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden border border-stone-100">
                  <ImageWithLoader src={project.images[0]} alt="Detail" className="object-cover w-full h-full" />
                </div>
                <div className="relative overflow-hidden border border-stone-100">
                  <ImageWithLoader src={project.images[1]} alt="Detail" className="object-cover w-full h-full" />
                </div>
              </div>
              <ProjectDetailsSection />
            </div>
          </motion.div>
        );

      case 3: // Layout D: Editorial Composition
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col z-10 relative p-4 overflow-visible h-auto md:h-full"
          >
            <div className="flex justify-between items-center mb-4 md:mb-6 border-b-2 border-stone-900 pb-4">
              <h3 className="text-[18px] md:text-[12px] font-sans font-bold text-stone-900 uppercase tracking-tighter truncate">{project.title[lang]}</h3>
              <div className="flex gap-4 text-[11px] md:text-[9px] font-black uppercase text-stone-400 shrink-0 ml-2">
                <span className="hidden md:inline">{project.category[lang]}</span>
                <span className="text-stone-900">{project.year}</span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 min-h-0">
              {/* Large Image Block */}
              <div className="col-span-1 md:col-span-8 md:row-span-4 relative overflow-hidden shadow-lg aspect-video md:aspect-auto">
                {showMedia ? <MediaOverlay /> : (
                  <>
                    <ImageWithLoader src={project.image} alt="Main" className="object-cover w-full h-full" />
                    <MediaTrigger />
                  </>
                )}
              </div>

              {/* Vertical Detail Block */}
              <div className="col-span-1 md:col-span-4 md:row-span-3 relative overflow-hidden border-l-4 border-amber-500 aspect-square md:aspect-auto">
                <ImageWithLoader src={project.images[0]} alt="Detail" className="object-cover w-full h-full" />
              </div>

              {/* Text Block */}
              <div className="col-span-1 md:col-span-4 md:row-span-3 flex flex-col justify-center">
                <p className="text-[13px] md:text-[9px] text-stone-600 leading-relaxed text-justify italic border-l-2 border-stone-200 pl-4">
                  {project.description[lang]}
                </p>
              </div>

              {/* Horizontal Specs Bar */}
              <div className="col-span-1 md:col-span-8 md:row-span-2 bg-stone-50 p-4 grid grid-cols-3 gap-4 items-center">
                <div className="text-center border-r border-stone-200 group cursor-default" onMouseEnter={playHoverSound}>
                  <span className="block text-[11px] md:text-[9px] font-bold text-stone-400 uppercase">Loc</span>
                  <span className="block text-[11px] md:text-[9px] font-bold truncate group-hover:text-amber-600 transition-colors">{project.specs.location.split(',')[0]}</span>
                </div>
                <div className="text-center border-r border-stone-200 group cursor-default" onMouseEnter={playHoverSound}>
                  <span className="block text-[11px] md:text-[9px] font-bold text-stone-400 uppercase">Area</span>
                  <span className="block text-[11px] md:text-[9px] font-bold group-hover:text-amber-600 transition-colors">{project.specs.area}</span>
                </div>
                <div className="text-center group cursor-default" onMouseEnter={playHoverSound}>
                  <span className="block text-[11px] md:text-[9px] font-bold text-stone-400 uppercase">Status</span>
                  <span className="block text-[11px] md:text-[9px] font-bold truncate group-hover:text-amber-600 transition-colors">{project.specs.status[lang]}</span>
                </div>
              </div>
            </div>
            <ProjectDetailsSection />
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className="h-full bg-white relative overflow-y-auto overflow-x-hidden p-4 md:p-10 scroll-smooth"
    >
      {/* Sticky Header */}
      <AnimatePresence>
        {showStickyHeader && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="absolute top-0 left-0 right-0 z-[60] bg-stone-900/95 backdrop-blur-md text-white px-6 py-3 flex justify-between items-center shadow-lg border-b border-white/10"
          >
            <div className="flex flex-col min-w-0">
              <h4 className="text-[12px] font-black uppercase tracking-tighter truncate">{project.title[lang]}</h4>
              <span className="text-amber-500 text-[9px] font-bold uppercase tracking-widest">{project.category[lang]}</span>
            </div>
            <div className="text-[9px] font-mono text-white/40">0{index + 1}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Structural Lines Background */}
      <div className="absolute top-0 left-10 bottom-0 w-px bg-stone-100"></div>
      <div className="absolute top-10 left-0 right-0 h-px bg-stone-100"></div>
      
      {/* Render selected layout */}
      {renderLayout()}
    </div>
  );
};

const TikTokIcon = ({ size = 12 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Standalone BackCover Component
const BackCover = ({ lang, onBackToStart }: { lang: Language, onBackToStart: () => void }) => {
  const appUrl = process.env.APP_URL || window.location.origin;

  return (
    <div className="h-full flex flex-col bg-stone-900 text-white p-6 md:p-10 relative overflow-hidden">
      {/* Animating Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -inset-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent"
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '10%', '-10%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Animating Texture Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay z-0" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        animate={{
          backgroundPosition: ['0px 0px', '10px 10px', '-10px -5px', '5px -10px', '0px 0px'],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Background Grid & Technical Lines */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      {/* Decorative Architectural Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Centered Cross */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-stone-500/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-stone-500/30"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-amber-500/50"></div>
        <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-amber-500/50"></div>
        <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-amber-500/50"></div>
        <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-amber-500/50"></div>
      </div>

      <div className="flex-1 flex flex-col justify-between z-10 relative h-full">
        {/* Top Section: Branding */}
        <div className="flex justify-between items-start border-b border-stone-800 pb-4 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-amber-500"></div>
              <h1 className="text-[12px] font-sans font-black tracking-[0.2em] text-white uppercase">
                {content.common.name}
              </h1>
            </div>
            <span className="text-[9px] text-amber-500 uppercase tracking-widest font-medium ml-4">
              {content.common.role[lang]}
            </span>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="text-[9px] text-stone-500 uppercase tracking-[0.3em] mb-0.5">Portfolio Vol. 01</span>
            <div className="text-[7px] text-stone-600 font-mono">2024 — 2026</div>
          </div>
        </div>

        {/* Main Content: Centered Hero */}
        <div className="flex-1 flex flex-col justify-center items-center text-center py-4 min-h-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center h-full"
          >
            <h2 className="text-5xl md:text-7xl font-sans font-black mb-3 uppercase tracking-tighter text-white leading-none">
              {content.back.thankYou[lang]}<span className="text-amber-500">.</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-stone-400 max-w-md text-[10px] font-light italic leading-relaxed mx-auto uppercase tracking-widest mb-8">
              {content.back.getInTouch[lang]}
            </p>

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3">
                <a 
                  href={`mailto:${content.common.contact.email}`} 
                  className="group flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 rounded-sm shadow-lg border border-amber-500"
                >
                  <Mail size={12} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Contact Me</span>
                </a>
                <button 
                  onClick={(e) => { e.stopPropagation(); onBackToStart(); }}
                  className="group flex items-center gap-2 px-5 py-2.5 border border-stone-700 hover:border-amber-500 text-stone-400 hover:text-amber-500 transition-all duration-300 rounded-sm bg-stone-900/50 backdrop-blur-sm"
                >
                  <RotateCcw size={12} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Return to Cover</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: 3-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-stone-800 pt-6 items-start shrink-0">
          
          {/* Column 1: Contact Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 group">
                <Mail size={10} className="text-amber-500" />
                <span className="font-mono text-[9px] text-stone-400 group-hover:text-white transition-colors">{content.common.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Phone size={10} className="text-amber-500" />
                <span className="font-mono text-[9px] text-stone-400 group-hover:text-white transition-colors">{content.common.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 group">
                <MapPin size={10} className="text-amber-500" />
                <span className="text-[9px] text-stone-400 group-hover:text-white transition-colors">{content.common.contact.location[lang]}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Social Connect */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1">Social Connect</h4>
            <div className="flex gap-3">
              <a href={content.common.contact.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-amber-500 hover:border-amber-500 hover:bg-amber-500/10 transition-all">
                <Facebook size={14} />
              </a>
              <a href={content.common.contact.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-amber-500 hover:border-amber-500 hover:bg-amber-500/10 transition-all">
                <Instagram size={14} />
              </a>
              <a href={content.common.contact.socials.tiktok} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-amber-500 hover:border-amber-500 hover:bg-amber-500/10 transition-all">
                <TikTokIcon size={14} />
              </a>
            </div>
            <div className="text-[8px] font-mono text-stone-600 mt-1">@minhhanh.arch</div>
          </div>

          {/* Column 3: Digital & Signature */}
          <div className="flex flex-col items-end gap-3 text-right">
             <div className="flex items-center gap-3">
               <div className="text-right">
                 <div className="text-[14px] font-serif italic text-amber-500 tracking-tighter mb-0.5">Minh Hanh.</div>
                 <div className="text-[6px] font-mono text-stone-600 uppercase tracking-widest">© 2024 All Rights Reserved</div>
               </div>
               <div className="bg-white p-1 rounded-sm">
                 <QRCodeSVG value={appUrl} size={40} level="L" />
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const Book = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Sync global variable with React state
  useEffect(() => {
    globalMuted = isMuted;
  }, [isMuted]);

  // --- Content Renderers ---

  const CoverFront = () => (
    <div className="h-full flex flex-col bg-stone-900 text-white relative overflow-hidden">
      {/* Animating Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -inset-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-transparent to-transparent"
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '10%', '-10%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Animating Texture Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay z-0" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        animate={{
          backgroundPosition: ['0px 0px', '10px 10px', '-10px -5px', '5px -10px', '0px 0px'],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Decorative Architectural Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 right-10 h-[1px] bg-stone-700"></div>
        <div className="absolute bottom-10 left-10 right-10 h-[1px] bg-stone-700"></div>
        <div className="absolute top-10 bottom-10 left-10 w-[1px] bg-stone-700"></div>
        <div className="absolute top-10 bottom-10 right-10 w-[1px] bg-stone-700"></div>
        
        {/* Technical Callouts */}
        <div className="absolute top-12 left-12 text-[6px] font-mono text-stone-500 uppercase tracking-widest">Ref_System_001</div>
        <div className="absolute bottom-12 right-12 text-[6px] font-mono text-stone-500 uppercase tracking-widest rotate-180">Ref_System_001</div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col p-6 md:p-14">
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-amber-500"></div>
              <span className="text-white text-[9px] font-black tracking-[0.3em] uppercase">Architecture Portfolio</span>
            </div>
            <span className="text-stone-500 text-[9px] font-mono ml-4">VOL. 01 / 2024 — 2026</span>
          </div>
          <div className="z-50 flex flex-col items-end gap-1">
             <span className="text-[7px] text-stone-500 uppercase tracking-wider animate-pulse">
               Change Language / Đổi Ngôn Ngữ
             </span>
             <button 
               onClick={(e) => { e.stopPropagation(); setLang(l => l === 'en' ? 'vi' : 'en'); }}
               className="flex items-center gap-2 text-[9px] uppercase tracking-widest hover:text-amber-500 transition-colors border border-stone-700 px-3 py-1 rounded-sm bg-stone-900/50 backdrop-blur-sm"
             >
               <Globe size={10} /> {lang === 'en' ? 'VN' : 'EN'}
             </button>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-amber-500"></div>
              <h2 className="text-amber-500 text-[12px] tracking-[0.5em] uppercase font-black">{content.common.role[lang]}</h2>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-sans font-black leading-[0.8] tracking-tighter uppercase text-white mb-12 relative">
              <span className="block">MINH</span>
              <span className="block text-stone-800 outline-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>HẠNH</span>
              
              {/* Decorative Crosshair */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-amber-500"></div>
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest mb-1">Selected Works</span>
                <span className="text-white font-black text-2xl tracking-tighter">2024-2026</span>
              </div>
              <div className="h-12 w-[1px] bg-stone-800"></div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest mb-1">Location</span>
                <span className="text-stone-300 text-[9px] uppercase tracking-widest font-bold">Vietnam / Asia</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex justify-between items-end border-t border-stone-800/50">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-1 rounded-full bg-stone-500"></div>
              <span className="text-[8px] font-black uppercase text-stone-500 tracking-widest">Project Summary</span>
            </div>
            <p className="text-stone-400 text-[9px] max-w-[240px] leading-relaxed font-medium uppercase tracking-wider">
              {content.cover.subtitle[lang]}
            </p>
          </div>
          
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="group cursor-pointer flex flex-col items-end"
            onMouseEnter={playHoverSound}
            onClick={() => { playClickSound(); goNext(); }}
          >
             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 group-hover:text-white transition-colors mb-2">
               {content.cover.enter[lang]}
             </span>
             <div className="w-12 h-[1px] bg-amber-500 group-hover:w-20 transition-all duration-500"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const IntroBack = () => (
    <div className="h-full flex flex-col md:flex-row bg-white text-stone-800">
      {/* Photo Section - Full height on desktop */}
      <div className="w-full md:w-5/12 h-1/3 md:h-full relative overflow-hidden group">
        <ImageWithLoader 
          src={content.profile.photo} 
          alt={content.common.name} 
          className="w-full h-full object-cover grayscale"
          whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Vertical Text Overlay */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 origin-bottom-left -rotate-90 translate-x-full text-white/50 text-[9px] md:text-[10px] font-mono tracking-widest uppercase whitespace-nowrap hidden md:block">
          Architect & Designer
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full md:w-7/12 h-2/3 md:h-full p-5 md:p-10 flex flex-col relative">
        {/* Large Background Number */}
        <div className="absolute top-3 right-5 text-[100px] leading-none font-serif text-stone-100 -z-10 select-none">01</div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[12px] font-serif font-bold mb-4 md:mb-6 text-stone-900 relative inline-block uppercase tracking-widest">
            {content.profile.title[lang]}
            <span className="absolute -bottom-1.5 left-0 w-10 h-1 bg-amber-500"></span>
          </h3>
          
          <p className="text-[9px] leading-relaxed font-serif text-stone-600 mb-6 md:mb-8 text-justify">
            {content.profile.about[lang]}
          </p>

          <div className="grid grid-cols-2 gap-3 md:gap-6 border-t border-stone-200 pt-4 md:pt-6">
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest mb-1.5 text-stone-400">Location</h4>
              <p className="text-[9px] font-medium">{content.common.contact.location[lang]}</p>
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest mb-1.5 text-stone-400">Contact</h4>
              <p 
                onClick={(e) => { e.stopPropagation(); }}
                className="text-[9px] font-medium hover:text-amber-600 transition-colors cursor-pointer"
              >
                {content.common.contact.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileFront = () => (
    <div className="h-full bg-stone-50 p-5 md:p-10 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-6 md:mb-8 border-b border-stone-200 pb-3">
          <h3 className="text-[12px] font-serif font-bold text-stone-900 uppercase tracking-widest">Curriculum Vitae</h3>
          <span className="font-mono text-stone-400 text-[9px]">RESUME</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 h-full">
          {/* Left Column: Philosophy & Skills & Awards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-2 text-amber-600">{content.profile.philosophy.title[lang]}</h4>
              <p className="text-[9px] text-stone-600 leading-relaxed text-justify">
                {content.profile.philosophy.content[lang]}
              </p>
            </div>
            
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-2 text-amber-600">{content.profile.skills.title[lang]}</h4>
              <div className="flex flex-wrap gap-1.5">
                {content.profile.skills.items.map((skill, i) => (
                  <span 
                    key={i} 
                    className="text-[9px] border-b border-stone-300 pb-0.5 text-stone-600 cursor-default hover:text-amber-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-2 text-amber-600">{content.profile.awards.title[lang]}</h4>
              <div className="space-y-2 overflow-y-auto max-h-full pr-1">
                {content.profile.awards.items.map((award, i) => (
                  <div key={i} className="flex flex-col group cursor-default">
                    <span className="text-[9px] font-bold text-stone-800 group-hover:text-amber-600 transition-colors">{award.title[lang]}</span>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-stone-500 italic">{award.organization}</span>
                      <span className="text-[9px] font-mono text-stone-400">{award.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Education & Milestones */}
          <div className="md:col-span-8 flex flex-col gap-6 h-full">
            <div className="flex-1 min-h-0 flex flex-col">
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-3 text-stone-400 border-b border-stone-200 pb-1.5">{content.profile.experience.title[lang]}</h4>
              <div className="space-y-4 overflow-y-auto pr-1">
                {content.profile.experience.items.map((exp, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <div className="font-bold text-[9px] text-stone-900 group-hover:text-amber-600 transition-colors uppercase">{exp.role[lang]}</div>
                      <div className="font-mono text-[9px] text-stone-400">{exp.period}</div>
                    </div>
                    <div className="text-[9px] text-stone-500 italic mb-0.5">{exp.company}</div>
                    <div className="text-[9px] text-stone-600 leading-tight">{exp.desc[lang]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[40%]">
              <div className="flex flex-col">
                <h4 className="text-[12px] font-bold uppercase tracking-widest mb-3 text-stone-400 border-b border-stone-200 pb-1.5">{content.profile.education.title[lang]}</h4>
                <div className="overflow-y-auto pr-1">
                  {content.profile.education.items.map((edu, i) => (
                    <div key={i} className="flex flex-col gap-0.5 mb-3 group cursor-default">
                      <div className="font-bold text-[9px] text-stone-900 uppercase group-hover:text-amber-600 transition-colors">{edu.degree[lang]}</div>
                      <div className="text-[9px] text-stone-500 italic">{edu.school}</div>
                      <div className="font-mono text-[9px] text-stone-400">{edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[12px] font-bold uppercase tracking-widest mb-3 text-stone-400 border-b border-stone-200 pb-1.5">{content.profile.milestones.title[lang]}</h4>
                <div className="space-y-3 border-l border-stone-300 pl-3 ml-1 overflow-y-auto pr-1">
                  {content.profile.milestones.items.map((milestone, i) => (
                    <div key={i} className="relative group cursor-default">
                      <div className="absolute -left-[17px] top-1 w-1.5 h-1.5 rounded-full bg-amber-500 border border-stone-50 group-hover:scale-150 transition-transform"></div>
                      <div className="font-mono text-[9px] text-amber-600 mb-0.5">{milestone.year}</div>
                      <div className="text-[9px] text-stone-700 leading-tight group-hover:text-stone-900 transition-colors">{milestone.event[lang]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectIndexStats = () => {
    const categories = Array.from(new Set(content.projects.map(p => p.category[lang])));
    const totalArea = content.projects.reduce((acc, p) => acc + parseInt(p.specs.area), 0);
    
    return (
      <div className="h-full bg-stone-900 text-white p-6 md:p-10 flex flex-col relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-800/20 -skew-x-12 transform origin-top-right"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-10">
            <h3 className="text-[12px] font-sans font-black uppercase tracking-widest leading-none mb-4">
              Project Index
            </h3>
            <div className="w-16 h-2 bg-amber-500"></div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <span className="text-[12px] font-black uppercase text-stone-500 tracking-widest block mb-4">Statistics</span>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-stone-700 pb-1 group cursor-default">
                  <span className="text-[9px] text-stone-400 uppercase">Total Projects</span>
                  <span className="text-[12px] font-sans font-black text-amber-500 group-hover:scale-110 transition-transform">{content.projects.length}</span>
                </div>
                <div className="flex justify-between items-end border-b border-stone-700 pb-1 group cursor-default">
                  <span className="text-[9px] text-stone-400 uppercase">Active Years</span>
                  <span className="text-[12px] font-sans font-black group-hover:scale-110 transition-transform">2019-2024</span>
                </div>
                <div className="flex justify-between items-end border-b border-stone-700 pb-1 group cursor-default">
                  <span className="text-[9px] text-stone-400 uppercase">Total Area</span>
                  <span className="text-[12px] font-sans font-black group-hover:scale-110 transition-transform">~{totalArea} m²</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[12px] font-black uppercase text-stone-500 tracking-widest block mb-4">Categories</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-stone-800 border border-stone-700 text-[9px] font-bold uppercase tracking-wider hover:bg-amber-600 hover:border-amber-500 transition-all cursor-default"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div className="p-6 border-4 border-stone-800 relative">
              <span className="absolute -top-3 left-4 bg-stone-900 px-2 text-[12px] font-black uppercase text-amber-500">Curator's Note</span>
              <p className="text-[9px] text-stone-400 leading-relaxed italic font-light">
                "This collection represents a journey through diverse architectural typologies, from intimate residential retreats to expansive commercial hubs. Each project is a testament to the balance between structural integrity and aesthetic harmony."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectIndexVisual = ({ onProjectClick }: { onProjectClick: (index: number) => void }) => (
    <div className="h-full bg-white p-6 md:p-10 flex flex-col relative">
      <div className="flex justify-between items-center mb-8 border-b-4 border-stone-900 pb-4">
        <h3 className="text-[12px] font-sans font-black uppercase tracking-tighter">Selected Works</h3>
        <span className="text-[9px] font-black text-stone-400 uppercase">Visual Directory</span>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden">
        {content.projects.slice(0, 9).map((project, i) => (
          <motion.div 
            key={project.id} 
            className="flex flex-col group cursor-pointer"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onProjectClick(i);
            }}
          >
            <div className="aspect-square relative overflow-hidden bg-stone-100 mb-2 border border-stone-200 shadow-sm group-hover:shadow-md transition-all duration-300">
              <ImageWithLoader 
                src={project.image} 
                alt={project.title[lang]} 
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* Subtle Color Overlay */}
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500 z-10"></div>
              
              {/* Tooltip Overlay */}
              <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center p-3">
                <div className="bg-stone-900/90 backdrop-blur-sm text-white p-3 border border-amber-500/30 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="text-[7px] font-mono text-amber-500 uppercase tracking-[0.2em] mb-1 border-b border-amber-500/20 pb-1">
                    {project.category[lang]}
                  </div>
                  <div className="text-[10px] font-sans font-black uppercase leading-tight tracking-tighter">
                    {project.title[lang]}
                  </div>
                </div>
              </div>

              {/* Project Number - Visible only on hover */}
              <div className="absolute top-0 left-0 z-20">
                <div className="bg-stone-900 text-white text-[9px] font-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
            <span className="text-[9px] font-black uppercase text-stone-900 truncate tracking-tighter group-hover:text-amber-600 transition-colors">
              {project.title[lang]}
            </span>
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
              {project.category[lang]}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
        <span className="text-[9px] font-mono text-stone-400">ARCHITECTURAL PORTFOLIO © 2024</span>
        <div className="flex gap-1">
          {[1, 2, 3].map(dot => <div key={dot} className="w-1 h-1 rounded-full bg-stone-300"></div>)}
        </div>
      </div>
    </div>
  );

  const navigateToProject = (index: number) => {
    const targetSheet = Math.floor(index / 2) + 3;
    setCurrentPageIndex(targetSheet);
  };

  // Define sheets
  const sheets = [
    { front: <CoverFront />, back: <IntroBack /> },
    { front: <ProfileFront />, back: <ProjectIndexStats /> },
    { front: <ProjectIndexVisual onProjectClick={navigateToProject} />, back: <ProjectPage project={content.projects[0]} index={0} lang={lang} globalMuted={isMuted} /> },
    { front: <ProjectPage project={content.projects[1]} index={1} lang={lang} globalMuted={isMuted} />, back: <ProjectPage project={content.projects[2]} index={2} lang={lang} globalMuted={isMuted} /> },
    { front: <ProjectPage project={content.projects[3]} index={3} lang={lang} globalMuted={isMuted} />, back: <ProjectPage project={content.projects[4]} index={4} lang={lang} globalMuted={isMuted} /> },
    { front: <ProjectPage project={content.projects[5]} index={5} lang={lang} globalMuted={isMuted} />, back: <ProjectPage project={content.projects[6]} index={6} lang={lang} globalMuted={isMuted} /> },
    { front: <ProjectPage project={content.projects[7]} index={7} lang={lang} globalMuted={isMuted} />, back: <ProjectPage project={content.projects[8]} index={8} lang={lang} globalMuted={isMuted} /> },
    { front: <ProjectPage project={content.projects[9]} index={9} lang={lang} globalMuted={isMuted} />, back: <ProjectPage project={content.projects[10]} index={10} lang={lang} globalMuted={isMuted} /> },
    { front: <ProjectPage project={content.projects[11]} index={11} lang={lang} globalMuted={isMuted} />, back: <div className="h-full bg-stone-100 flex items-center justify-center text-stone-400 italic font-serif text-[9px]">Notes / Sketches</div> },
    { front: <div className="h-full bg-stone-800 flex items-center justify-center"><div className="w-24 h-24 md:w-32 md:h-32 border border-stone-600 rounded-full flex items-center justify-center text-stone-500 text-[9px] font-mono tracking-widest">LOGO</div></div>, back: <div className="h-full bg-stone-900 flex items-center justify-center text-stone-600 text-[9px] tracking-widest">END</div> },
    { front: <BackCover lang={lang} onBackToStart={() => { playClickSound(); setCurrentPageIndex(0); }} />, back: <div className="h-full bg-stone-900" /> }, // Back cover is now on the front of the last sheet
  ];

  // We need to calculate total sheets.
  // Cover (Front/Inside Front)
  // Profile (Front/Back)
  // Projects...
  // Back Cover
  
  // Let's define the "Sheets" content.
  // Sheet 0: Front=Cover, Back=Intro
  // Sheet 1: Front=Profile, Back=Skills
  // Sheet 2: Front=Project1, Back=Project2
  // Sheet 3: Front=Project3, Back=Project4
  // Sheet 4: Front=Contact, Back=End
  
  const totalSheets = sheets.length; 

  const handleFlip = (index: number) => {
    if (showHint) setShowHint(false);
    setFlippingIndex(index);
    playFlipSound();
    
    // If clicking a page that is already flipped (on the left stack), go back.
    // If clicking a page on the right stack, go forward.
    
    if (index < currentPageIndex) {
      // Go back (unflip)
      setCurrentPageIndex(index);
    } else {
      // Go forward (flip)
      setCurrentPageIndex(index + 1);
    }

    // Reset flipping index after animation
    setTimeout(() => setFlippingIndex(null), 1000);
  };

  const goNext = () => {
    if (showHint) setShowHint(false);
    if (currentPageIndex < totalSheets) {
      setFlippingIndex(currentPageIndex);
      playFlipSound();
      setCurrentPageIndex(prev => prev + 1);
      setTimeout(() => setFlippingIndex(null), 1000);
    }
  };

  const goPrev = () => {
    if (showHint) setShowHint(false);
    if (currentPageIndex > 0) {
      setFlippingIndex(currentPageIndex - 1);
      playFlipSound();
      setCurrentPageIndex(prev => prev - 1);
      setTimeout(() => setFlippingIndex(null), 1000);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex]);

  // Swipe Handling
  const handlePanEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goNext();
    } else if (info.offset.x > threshold) {
      goPrev();
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 flex flex-col items-center justify-center overflow-hidden py-4 md:py-10 relative">
      
      {/* Persistent Controls */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[100] flex flex-col items-end gap-2">
         {/* Language Toggle */}
         <button 
           onClick={() => { setLang(l => l === 'en' ? 'vi' : 'en'); }}
           className="bg-white/90 backdrop-blur-sm border border-stone-300 shadow-md px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 text-[9px] font-bold text-stone-800 hover:bg-white hover:text-amber-600 hover:shadow-lg transition-all"
         >
           <Globe size={14} className="md:w-4 md:h-4" />
           <span>{lang === 'en' ? 'EN' : 'VN'}</span>
           <span className="w-px h-3 bg-stone-300 mx-1"></span>
           <span className="text-stone-400 font-normal hidden md:inline">{lang === 'en' ? 'Tiếng Việt' : 'English'}</span>
         </button>
      </div>

      {/* Hint Overlay */}
      {showHint && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 md:gap-3 animate-bounce backdrop-blur-sm">
            <MousePointerClick size={20} className="md:w-6 md:h-6" />
            <span className="text-[9px] font-medium">Click pages to flip</span>
          </div>
        </div>
      )}

      {/* Book Container */}
      <motion.div 
        className="relative w-[95vw] md:w-[90vw] max-w-[1000px] aspect-square md:aspect-[3/2] [perspective:2000px]"
        onPanEnd={handlePanEnd}
      >
        <div className="relative w-full h-full [transform-style:preserve-3d]">
          
          {/* Spine (Visual only) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 md:w-4 -ml-1 md:-ml-2 bg-stone-800 z-0 rounded-sm shadow-inner"></div>

          {/* Render Sheets */}
          {sheets.map((sheet, index) => {
            // Calculate z-index.
            let zIndex = 0;
            if (index < currentPageIndex) {
              zIndex = index; // 0, 1, 2... on left stack
            } else {
              zIndex = sheets.length - index; // 5, 4, 3... on right stack
            }

            // Boost z-index for the page currently flipping
            if (index === flippingIndex) {
              zIndex = 100;
            }

            return (
              <div 
                key={index} 
                className="absolute top-0 left-1/2 w-1/2 h-full"
                style={{ 
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                <Page
                  pageIndex={index}
                  frontContent={sheet.front}
                  backContent={sheet.back}
                  isFlipped={index < currentPageIndex}
                  zIndex={zIndex}
                  onFlip={() => handleFlip(index)}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="mt-4 md:mt-8 flex gap-4 md:gap-8 items-center z-50">
        <button 
          onClick={goPrev}
          onMouseEnter={playHoverSound}
          disabled={currentPageIndex === 0}
          className="p-2 md:p-3 rounded-full bg-white shadow-lg disabled:opacity-30 hover:bg-amber-50 text-stone-800 transition-all"
        >
          <ArrowLeft size={16} className="md:w-5 md:h-5" />
        </button>
        
        <span className="font-mono text-[9px] text-stone-500">
          {currentPageIndex} / {sheets.length}
        </span>

        <button 
          onClick={goNext}
          onMouseEnter={playHoverSound}
          disabled={currentPageIndex === sheets.length}
          className="p-2 md:p-3 rounded-full bg-white shadow-lg disabled:opacity-30 hover:bg-amber-50 text-stone-800 transition-all"
        >
          <ArrowRight size={16} className="md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};
