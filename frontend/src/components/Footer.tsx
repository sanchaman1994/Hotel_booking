export default function Footer() {
	return (
		<div className="bg-blue-800 py-10 ">
			<div className="container mx-auto flex justify-between items-center">
				<span className="text-3xl text-white font-bold tracking-tight">
					Hotelnine.com
				</span>
				<span className="text-white flex font-bold tracking-tight gap-4">
					<p className="cursor-pointer">Privacy Policy</p>
					<p className="cursor-pointer">Copyright</p>
				</span>
			</div>
		</div>
	);
}
