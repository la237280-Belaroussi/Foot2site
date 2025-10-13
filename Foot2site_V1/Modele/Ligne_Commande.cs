namespace Foot2site_V1.Modele
{
    public class Ligne_Commande
    {
        public int Id { get; set; }
        public int quantite { get; set; }
        public double prixUnitaire { get; set; }
        public Commande commande { get; set; }
        public Stock_produit stock_Produit { get; set; }
    }
}
