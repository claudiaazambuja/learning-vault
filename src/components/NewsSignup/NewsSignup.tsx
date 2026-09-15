import { useEffect, useRef, useState, type FormEvent } from 'react';

const recipient = 'cclabdis@gmail.com';

interface Props { open: boolean; onClose: () => void }

export function NewsSignup({ open, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) { setStatus('idle'); setEmail(''); setHoney(''); return; }
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const focusables = [...document.querySelectorAll<HTMLElement>('.signup-panel button, .signup-panel input:not([tabindex="-1"])')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; previousFocus?.focus(); };
  }, [open, onClose]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (honey) return;
    setStatus('sending');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          assunto: 'Novidades sobre indústria e tecnologia',
          _subject: 'Learning Vault — nova inscrição para novidades',
          _captcha: 'false',
          _honey: honey,
        }),
      });
      const result: { success?: boolean | string } = await response.json();
      if (!response.ok || result.success !== true && result.success !== 'true') throw new Error('Submission failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;
  return <div className="signup-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><div className="signup-panel" role="dialog" aria-modal="true" aria-labelledby="signup-title"><button ref={closeRef} type="button" className="signup-close" aria-label="Fechar inscrição" onClick={onClose}>×</button><p className="eyebrow">FIQUE POR DENTRO</p><h2 id="signup-title">Indústria &<br /><em>tecnologia.</em></h2>{status === 'success' ? <div className="signup-success" role="status"><strong>Pedido enviado.</strong><p>Obrigada pelo interesse! Seu endereço foi registrado para contato sobre novidades.</p><button type="button" onClick={onClose}>Voltar ao site ↗</button></div> : <><p className="signup-intro">Deixe seu email para receber notícias, ideias e conteúdos sobre indústria e tecnologia.</p><form onSubmit={submit}><label htmlFor="signup-email">Seu email</label><div className="signup-field"><input id="signup-email" name="email" type="email" autoComplete="email" placeholder="seu@email.com" required value={email} onChange={event => { setEmail(event.target.value); if (status === 'error') setStatus('idle'); }} /><button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Quero receber ↗'}</button></div><div className="signup-honey" aria-hidden="true"><label htmlFor="signup-website">Não preencha</label><input id="signup-website" type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={event => setHoney(event.target.value)} /></div>{status === 'error' && <p className="signup-error" role="alert">Não foi possível enviar agora. Tente novamente em alguns instantes.</p>}<p className="signup-privacy">Seu endereço será encaminhado a {recipient} pelo serviço FormSubmit para contato sobre novidades. Você poderá pedir a remoção da lista a qualquer momento.</p></form></>}</div></div>;
}
