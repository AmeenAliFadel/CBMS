export default function AuthDivider() {
    return (
        <div className="my-7 flex items-center gap-3">

            <span className="h-px flex-1 bg-border" />

            <p className="text-xs font-medium uppercase tracking-widest text-text-secondary">
                Or continue with
            </p>

            <span className="h-px flex-1 bg-border" />
        </div>
    );
}