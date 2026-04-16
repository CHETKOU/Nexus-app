"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, RotateCcw, Zap, Timer, Check,
  Maximize2, Sparkles, ArrowRight, 
  LayoutGrid, Square, Type, Camera, Trash2
} from 'lucide-react';

export default function CreateStudio({ onClose }: { onClose: () => void }) {
  // --- 1. ÉTATS ET CONSTANTES (DÉFINIS EN PREMIER) ---
  const [mode, setMode] = useState('2 MIN');
  const [step, setStep] = useState<'capture' | 'preview'>('capture');
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const modes = ['2 MIN', '60 S', 'IMAGE', 'TEXTE', 'LIVE'];
  const MAX_DURATION = mode === '2 MIN' ? 120 : 60;

  // --- 2. RÉFÉRENCES ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // --- 3. GESTION DE LA CAMÉRA ---
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user", width: 1280, height: 720 }, 
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Erreur caméra NEXUS:", err);
      }
    }

    if (mode !== 'TEXTE' && step === 'capture') {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [mode, step]);

  // --- 4. LOGIQUE DU TIMER ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && seconds < MAX_DURATION) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (seconds >= MAX_DURATION) {
      handleStop();
    }
    return () => clearInterval(interval);
  }, [isRecording, seconds]);

  // --- 5. ACTIONS DE CAPTURE ---
  const handleStart = () => {
    if (!videoRef.current?.srcObject) return;
    setSeconds(0);
    chunksRef.current = [];
    const stream = videoRef.current.srcObject as MediaStream;
    const recorder = new MediaRecorder(stream);
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
      setPreviewUrl(URL.createObjectURL(blob));
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const handleStop = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleNext = () => {
    if (mode === 'TEXTE' && textInput.length > 0) {
      setStep('preview');
    } else if (previewUrl || mode === 'IMAGE') {
      setStep('preview');
    }
  };

  const resetCapture = () => {
    setPreviewUrl(null);
    setStep('capture');
    setSeconds(0);
    setIsRecording(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col text-white font-sans overflow-hidden">
      
      {/* --- PHASE 1 : CAPTURE --- */}
      {step === 'capture' && (
        <>
          {mode === 'TEXTE' ? (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-gray-900 flex items-center justify-center p-10">
              <textarea 
                placeholder="Écrivez votre message pro..."
                className="w-full bg-transparent text-center text-3xl font-mono focus:outline-none placeholder:opacity-20"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover z-0 opacity-70" />
          )}

          {/* OVERLAY INTERFACE CAPTURE */}
          <div className="relative z-10 flex flex-col h-full pointer-events-none">
            
            {/* HEADER */}
            <div className="flex justify-between items-center p-6 pointer-events-auto">
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X className="w-8 h-8" />
              </button>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-black/60 border border-white/5 rounded-lg backdrop-blur-xl">
                <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} />
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  {isRecording ? 'Recording' : 'Standby'}
                </span>
                {(isRecording || mode.includes('MIN')) && (
                  <span className="text-xs font-mono text-blue-400 border-l border-white/10 pl-3">
                    {Math.floor(seconds/60)}:{(seconds%60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
              <div className="w-10" />
            </div>

            {/* SIDEBAR */}
            {mode !== 'TEXTE' && (
              <div className="absolute right-5 top-24 flex flex-col gap-8 bg-black/40 p-3 rounded-2xl border border-white/5 backdrop-blur-md pointer-events-auto">
                <RotateCcw className="w-5 h-5 opacity-60" />
                <Zap className="w-5 h-5 text-yellow-400 opacity-60" />
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
            )}

            {/* BOTTOM CONTROLS */}
            <div className="mt-auto pointer-events-auto bg-gradient-to-t from-black via-black/90 to-transparent pb-10 pt-10">
              
              {/* SÉLECTEUR DE MODE (L'ERREUR ÉTAIT ICI) */}
              <div className="flex justify-center items-center gap-6 mb-8 overflow-x-auto no-scrollbar px-10">
                {modes.map((m) => (
                  <button 
                    key={m} 
                    onClick={() => !isRecording && setMode(m)} 
                    className={`text-[11px] font-mono tracking-[0.2em] px-3 py-1.5 rounded transition-all ${
                      mode === m ? 'text-white bg-blue-600/20 border border-blue-500/40' : 'text-gray-500 opacity-40'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-around px-8">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center opacity-40">
                  <LayoutGrid className="w-5 h-5" />
                </div>

                {/* DÉCLENCHEUR */}
                <button 
                  onClick={isRecording ? handleStop : mode === 'IMAGE' ? handleNext : handleStart}
                  className={`relative flex items-center justify-center p-1 rounded-full border-[2px] transition-all duration-500 ${
                    isRecording ? 'border-red-500' : 'border-blue-500/50'
                  }`}
                >
                  <div className={`transition-all duration-500 flex items-center justify-center ${
                    isRecording ? 'w-16 h-16 rounded-xl bg-red-600' : 'w-20 h-20 rounded-full bg-blue-600'
                  }`}>
                    {isRecording ? <Square className="fill-white text-white w-5 h-5" /> : 
                     mode === 'IMAGE' ? <Camera className="text-white w-8 h-8" /> : null}
                  </div>
                </button>

                <button 
                  onClick={handleNext} 
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all ${
                    (previewUrl || textInput) ? 'bg-blue-600 shadow-lg shadow-blue-900/40' : 'bg-white/5 opacity-20'
                  }`}
                >
                   Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --- PHASE 2 : PREVIEW --- */}
      {step === 'preview' && (
        <div className="relative h-full w-full flex flex-col bg-black animate-in fade-in duration-500">
          {mode === 'TEXTE' ? (
            <div className="flex-1 flex items-center justify-center p-10 bg-gradient-to-br from-blue-900 to-black">
              <p className="text-3xl font-mono text-center">{textInput}</p>
            </div>
          ) : (
            <video src={previewUrl!} autoPlay loop className="flex-1 object-cover" />
          )}

          {/* OVERLAY PREVIEW */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            <div className="p-6 flex justify-between pointer-events-auto">
              <button onClick={resetCapture} className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                <span className="text-[10px] font-bold">REPRENDRE</span>
              </button>
            </div>

            <div className="mt-auto p-8 bg-gradient-to-t from-black to-transparent flex flex-col gap-6 pointer-events-auto">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-lg">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg">S</div>
                <div className="flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase">Samuel Dimitri</p>
                  <p className="text-[9px] text-blue-400 font-mono italic">Nexus Intelligence System v1.0</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button onClick={resetCapture} className="flex-1 py-4 bg-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/5 hover:bg-gray-800 transition-all">
                  <Trash2 className="w-5 h-5 text-red-500" /> ANNULER
                </button>
                <button className="flex-[2] py-4 bg-blue-600 rounded-xl font-black flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all">
                   PUBLIER SUR NEXUS <Check className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}